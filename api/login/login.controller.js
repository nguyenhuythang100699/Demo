const {
     getUserByUserEmail
    } = require("./login.service");
const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
    login: (req,res)=>{
        const body = req.body;
        getUserByUserEmail(body.email, (err,results)=>{
            if(err){
                console.log(err);
            }
            //400 status -> The server could not understand the request due to invalid syntax.
            //result is false, !result is true
            if(!results){
                return res.status(400).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                //Hide password of user
                results.password = undefined;
                console.log(results)
                //Jwt.sign(payload (information of user), secretOrPrivateKey, [options, callback])
                //Options: algorithm (default HS256), expiresIn ("60" is equal to "60ms", "2 days", "10h", "7d")
                const jsontoken = sign({result: results}, process.env.DB_PRIVATEKEY,{
                    expiresIn: "1h"
                });
                res.json({
                    success: 1,
                    token: jsontoken,
                    user: results
                });
            }
            else{
                return res.status(401).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
}