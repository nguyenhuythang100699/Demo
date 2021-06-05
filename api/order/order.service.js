const pool = require('../../config/database');
const { verify,sign } = require("jsonwebtoken");
const {compareSync} = require("bcrypt");

const {verifyUser, getUserByUserEmail} = require("../login/login.service")
module.exports = {
    order: (token,product,callBack) =>{
            if(token){
                verify(token, process.env.DB_PRIVATEKEY,(err,decoded)=>{
                    if(err){
                        return callBack(err);
                    }else{
                            verifyUser(decoded, (err,results)=>{
                                if(err){
                                    return callBack(err);
                                }else{
                                    console.log(decoded.iat)
                                    let orderId = results.userName+ "_"+ decoded.iat;
                                    let ts = Date.now();
                                    let date_ob = new Date(ts);
                                    let date = date_ob.getDate(); 
                                    let month = date_ob.getMonth() + 1; 
                                    let year = date_ob.getFullYear();
                                    let fullDate = year + "-" + month + "-" + date;
                                    pool.query(`insert into product_order(orderId, productId, productSize,quantity)
                                    values(?,?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + ?`, [orderId, product.productId, product.productSize, product.quantity,  product.quantity],(error, results, fields)=>{
                                        if(err){
                                            return callBack(err);
                                        }
                                    });
                                    pool.query(
                                        `
                                        insert into orders(orderId, userId, totalPrice, orderDate, status)
                                        values (?,?,(Select productPrice * ? from products where productId = ?),?,?) 
                                        ON DUPLICATE KEY UPDATE totalPrice = totalPrice + (Select productPrice * ? from products where productId = ?), orderDate = ?`,
                                        [orderId, decoded.result.Id, product.quantity, product.productId, fullDate,"verifying",
                                        product.quantity, product.productId, fullDate],(error, results, fields)=>{
                                            if(error){
                                                return callBack(error);
                                            }
                                            return callBack(null,results);
                                        
                                        });
                                }
                            });
                            
                    }
                });
            }else{
                return callBack("error");
            }
    },
    orderDetail: (token,callBack) =>{
        if(token){
            verify(token, process.env.DB_PRIVATEKEY,(err,decoded)=>{
                if(err){
                    return callBack(err);
                }else{
                        verifyUser(decoded, (err,results)=>{
                            if(err){
                                return callBack(err);
                            }else{
                                pool.query(`select od.orderId, od.totalPrice, od.orderDate, od.status, pd.productId, po.productSize, po.quantity, pd.imageUrl,pd.productName, (pd.productPrice * po.quantity) as totalProductPrice
                                from (orders od INNER JOIN product_order po on od.orderId = po.orderId) inner join products pd on pd.productId = po.productId
                                where od.userId = ? and od.status = ?
                                `,[decoded.result.Id,"verifying"],(error, results, fields)=>{
                                    if(error){
                                        return callBack(error);
                                    }
                                    return callBack(null,results);
                                
                                });
                            }
                        });
                        
                }
            });
        }else{
            return callBack("error");
        }
    },
    ordered:(token, orderId,expireDate, callBack)=>{
        if(token){
            verify(token, process.env.DB_PRIVATEKEY,(err,decoded)=>{
                if(err){
                    return callBack(error);
                }else{
                    getUserByUserEmail(decoded.result.email, (err,results)=>{
                        if(err){
                            return callBack(error);
                        }
                        if(!results){
                            return callBack(error);
                        }
                        let expireYear = expireDate.slice(-4);
                        let expireMonth = expireDate.slice(-7,-5);
                        let expireDay = expireDate.slice(0,2);                        
                        let expireFullDate =  expireYear + "-" + expireMonth + "-" + expireDay;

                                const result = (decoded.result.userName)== (results.userName);
                                if(result){
                                    results.password = undefined;
                                    const jsontoken = sign({result: results}, process.env.DB_PRIVATEKEY,{
                                    expiresIn: "1h"
                                });
                                pool.query(`UPDATE orders set status = 'processing', expireDate = ? where orderId = ?`,[expireFullDate, orderId],(error, results, fields)=>{
                                    if(error){
                                        return callBack(error);
                                    }
                                    return callBack(null,jsontoken);
                                    });
                                }
                                else{
                                    return callBack("error");
                                }
                            
                    });
                }
            });
        }else{
            return callBack("error");
        }
    },
    deleteOrder: (data,callBack) =>{
        pool.query(
            `delete from product_order where productId = ?`,
            [data.productId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
            }
        );
        pool.query(
            `UPDATE orders set totalPrice = totalPrice - (Select productPrice * ? from products where productId = ?)
            where orderId= ?`,
            [data.quantity,data.productId,data.orderId],(error, results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            
            });
    },
    checkOrder: (callBack) =>{
        pool.query(
            `select * from orders`, [],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
            
        );
    },
    delivered : (orderId, callBack)=>{
        pool.query(
            `UPDATE orders set status = 'delivered' where orderId = ?`, [orderId],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
            
        );
    },
    checkIfExpired : (callBack)=>{
        pool.query(`UPDATE orders set status = "expired" WHERE expireDate >= CURDATE()`,[],(error, results, fields)=>{
            if(error){
                return callBack(error);
            }
        });
    }

}