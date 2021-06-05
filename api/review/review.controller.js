const {review} = require("./review.service")


module.exports = {
    review: (req,res) =>{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            let token = req.headers.authorization.split('Bearer ')[1];
        data = req.body;
        console.log(data)
        review(token, data, (err,results)=>{
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
    }
}