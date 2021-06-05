const pool = require("../../config/database");

module.exports = {
    getUsers: (callBack) =>{
        pool.query(
            `select Id,userName, phone ,email,address from registration`,
            [],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUserByUserId: (id, callBack)=>{
        console.log(id)
        pool.query(
            `select Id, userName, phone ,email,address, userimage from registration where Id = ?`,
            [id],
            (error, results, fields) => {
                console.log(error)
                console.log(results)
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    updateUser: (data, callBack) =>{
        console.log(data)
        pool.query(
            `update registration set userName=?, phone=? ,email=?,address =?, userimage=? where Id = ?`,
            [
                data.userName,
                data.phone,
                data.email,
                data.address,
                data.userimage,
                data.Id
            ],
            (error, results, fields) => {
                console.log(results)
                if(error){
                    console.log(error)
                    return callBack(error);
                }
                return callBack(null,results);
            }

        );
    },
    deleteUser: (data,callBack) =>{
        pool.query(
            `delete from registration where Id = ?`,
            [data.id],
            (error, results, fields) => {
                if(error){
                    
                    return callBack(error);
                }
                console.log(results[0])
                return callBack(null,results[0]);
            }
        );
    },
    getUserByUserEmail: (email, callBack)=>{
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    }

};