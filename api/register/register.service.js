const pool = require("../../config/database");

module.exports = {
    regularRegister:(data, callBack) =>{
        pool.query(
            `insert into registration(userName,password,phone,email,role,address)
                values(?,?,?,?,"user",?)`,
                [
                    data.userName,
                    data.password,
                    data.phone,
                    data.email,
                    data.address
                ],
                (error,results,fields)=>{
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
        );
    },
    checkExist: (data, callBack) =>{
        pool.query(
            `select email from registration where userName= ? `, [data.userName],
            (error,results,fields)=>{
                
                console.log(results) //if [ RowDataPacket { email: 'hktstudent@gmail.com' } ]
                
                if(error){
                    return callBack(error);
                }
                if(results.toString() != "") {
                    console.log(results.toString())
                    return callBack(error,"userName existed");
                }
                else{
                    pool.query(
                        `select userName from registration where email= ? `, [data.email],
                        (error,results,fields)=>{
                            console.log(results)
                            if(error){
                                return callBack(error);
                            }
                            if(results.toString() != "") {
                                console.log(results.toString())
                                return callBack(error,"email existed");
                            }
                            else{
                                pool.query(
                                    `select userName from registration where phone= ? `, [data.phone],
                                    (error,results,fields)=>{
                                        console.log(results)
                                        if(error){
                                            return callBack(error);
                                        }
                                        if(results.toString() != "") {
                                            console.log(results.toString())
                                            return callBack(error,"phone existed");
                                        }
                                        else{
                                            pool.query(`select userName from registration where address= ?`, [data.address],(error,results) => {
                                                console.log(results)
                                                if(error)
                                                {
                                                    return callBack(error);
                                                }
                                                else if (results.toString() != "")
                                                {
                                                    console.log(results.toString())
                                                    return callBack(error,"address existed");
                                                }
                                                else {
                                                
                                                    return callBack(null,"OK");
                                                }
                                            });
                                        }
                                        
                                    }
                                );
                            }
                            
                        }
                    );
                }
                
            }
        );
    }

};