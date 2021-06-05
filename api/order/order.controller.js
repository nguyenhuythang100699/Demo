const {order,orderDetail,ordered,checkOrder,delivered,checkIfExpired,deleteOrder} = require("./order.service");

module.exports = {
    order: (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            let token = req.headers.authorization.split('Bearer ')[1];
        data = req.body;
        order(token, data, (err,results)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    success: 0,
                    message: "Can not order product"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    } else {
        return res.status(403).json({
            success:0,
            message: "Token expired or Unauthorized Status Code"
        });
    }
    },
    deleteOrder: (req,res)=> {
        const data = req.query;
        console.log(data)
        deleteOrder(data,(err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "something went wrong"
                });
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Oder not found"
                });
            }
            
            return res.status(200).json({
                success:1,
                message: "update status successfully into canceled",
                data : results
            });
        });
    },
    getOrderDetail:(req,res)=>{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            let token = req.headers.authorization.split('Bearer ')[1];
        orderDetail(token, (err,results)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    success: 0,
                    message: "Can not view order detail"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    } else {
        return res.status(403).json({
            success:0,
            message: "Token expired or Unauthorized Status Code"
        });
    }
    },
    ordered:(req,res)=>{
            orderId = req.body.orderId;
            expireDate = req.body.expireDate;
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer '))
            {
            let token = req.headers.authorization.split('Bearer ')[1];
            ordered(token, orderId,expireDate,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(401).json({
                        success: 0,
                        message: "Can not order this cart, check products"
                    });
                }
                res.cookie("token", results,{httpOnly: true, maxAge: 3600000, signed: true });
                return res.status(200).json({
                    success:1,
                    data: results
                });
            });
        } else {
            return res.status(403).json({
                success:0,
                message: "Token expired or Unauthorized Status Code"
            });
        }
    },
    checkOrder: (req,res) =>{
        checkOrder( (err,results) =>{
            if(err){
                return res.status(401).json({
                    success:0,
                    message: "Unauthorized"
                });
            }
            return res.json({
                success:1,
                data: results
            });
        });
    },
    delivered:(req,res)=>{
        const orderId = req.body.orderId;
        delivered(orderId,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    success: 0,
                    message: "Can not update status, something went wrong..."
                });
            }
            return res.status(200).json({
                success:1,
                message: "Update successfully"
            });
        });
    },
    checkIfExpired:(req,res)=>{
        checkIfExpired((err,results)=>{
            if(err){
                console.log(err);
            }
        });
    }
}