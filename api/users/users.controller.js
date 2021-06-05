const {
    getUserByUserId,
     getUsers, 
     updateUser, 
     deleteUser,
     getUserByUserEmail
    } = require("./users.service");
const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
module.exports = {
    getUserById: (req,res) => {
        const id = req.query.id;
        getUserByUserId(id, (err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "something went wrong"
                });
            }
            if(!results){
                return res.status(401).json({
                    success: 0,
                    message: "The user is not exist"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    getUsers: (req,res) => {
        getUsers( (err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).jsont({success:0, message: 'something went wrong'});
            }
            return res.status(201).json({
                success:1,
                data: results
            });
        });
    },
    updateUser: (req,res)=> {
        const body = req.body;
        let token = req.headers.authorization.split('Bearer ')[1];
        if(token)
        {
            verify(token, process.env.DB_PRIVATEKEY,(err,decoded)=>{
                if(err)
                {

                }
                else 
                {
                        updateUser(body,(err, results)=>{
                            if(err){
                                return res.status(500).json({
                                    success: 0,
                                    message: "something went wrong"
                                });
                            }
                            if(!results){
                                return res.json({
                                    success: 0,
                                    message: "Update failed"
                                });
                            }
                            return res.status(200).json({
                                success:1,
                                message: "Update successfull"
                            });
                        });
                    }
            });
        }
    },
    deleteUser: (req,res)=> {
        let data = req.query;
        console.log(data)
        deleteUser(data,(err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "something went wrong"
                });
            }
            // if(!results){
            //     return res.status(400).json({
            //         success: 0,
            //         message: "User not found"
            //     });
            // }
            return res.status(200).json({
                success:1,
                message: "user deleted successfully"
            });
        });
    },
    login: (req,res)=>{
        const body = req.body;
        getUserByUserEmail(body.email, (err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, process.env.DB_PRIVATEKEY,{
                    expiresIn: "1h"
                });
                res.cookie("token", jsontoken,{httpOnly: true, maxAge: 3600000, signed: true });
                res.redirect("/api/users");
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