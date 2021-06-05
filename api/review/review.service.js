const pool = require('../../config/database');
const { verify,sign } = require("jsonwebtoken");
const {compareSync} = require("bcrypt");
const {verifyUser, getUserByUserEmail} = require("../login/login.service")
module.exports = {
    review: (token,review,callBack) =>{
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
                                let reviewId = results.userName;
                                let ts = Date.now();
                                let date_ob = new Date(ts);
                                let date = date_ob.getDate(); 
                                let month = date_ob.getMonth() + 1; 
                                let year = date_ob.getFullYear();
                                let fullDate = year + "-" + month + "-" + date;
                                pool.query(`insert into review(reviewId, productId, star,comment)
                                values(?,?,?,?)`, [reviewId, review.productId, review.star, review.comment],(error, results, fields)=>{
                                    if(err){
                                        return callBack(err);
                                    }
                                });
                                pool.query(
                                    `
                                    update registration
                                    set reviewId = ?
                                    where Id=?
                                    `,
                                    [reviewId,decoded.result.Id],(error, results, fields) => {
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
}
}