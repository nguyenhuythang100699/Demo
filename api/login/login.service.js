const pool = require("../../config/database");

module.exports = {
    getUserByUserEmail: (email, callBack)=>{
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                    return callBack(null,error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    //Check if token expired 
    verifyUser: (decodedToken, callBack)=>{
        //Date.now() >= exp * 1000 ==> Token has expired
        if(decodedToken && (decodedToken.exp * 1000 > Date.now()) ){
            pool.query(
                `select userName from registration where email = ?`,
                [decodedToken.result.email],
                (error,results,fields)=>{
                    if(error || (results[0].userName != decodedToken.result.userName)){
                        return callBack(error);
                    }
                    return callBack(null,results[0]);
                }
            )
        }else{
            
        }
    },

};