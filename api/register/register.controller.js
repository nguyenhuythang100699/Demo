const {
    regularRegister,
    checkExist
    } = require("./register.service");
const {genSaltSync, hashSync, compareSync} = require("bcrypt");
module.exports = {
    regularRegister: (req,res)=> {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        regularRegister(body,(err, results)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    success: 0,
                    message: "Can not create your account, Please type missing fields"
                });
            }
            return res.status(201).json({
                success:1,
                data: "created successfully"
            });
        });
    },
    checkExist: (req,res,next)=>{
        const body = req.body;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (emailRegexp.test(body.email))
        {
            checkExist(body,(err, results)=>{
                if((!body.userName) || (!body.email) || (!body.password) || (!body.phone) || (!body.address) ) err = "missing fields";

                if(err){
                    console.log(err);
                    //400 => invalid parameter
                    return res.status(400).json({
                        success: 0,
                        message: "Can not create your account, Please type missing fields"
                    });
                }
                else {
                    if(results !="OK"){
                        //(401/4xx) unauthorized request
                    return res.status(401).json({
                        success: 0,
                        message: "Username or email or phone or address already exist"
                    });
                    }
                    
                else {
                    next();
                }
            
                }
            });
        }
        else {
            return res.status(400).json({
                success: 0,
                message: "Email or UserName is invalid"
            });
        }
    }
}