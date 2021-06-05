const pool = require('../../config/database');

module.exports = {
    getAllCategory: (callBack) =>{
        pool.query(
            `select * from categories`, [],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
            
        );
    },
    createCategory: (category, callBack) =>{
        pool.query(
            `insert into categories (categoryName,categoryImage)  values (?,?)`,[category.categoryName,category.categoryImage],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results.insertId);
            }
        );

    },
    deleteCategory:(categoryId, callBack) =>{
        pool.query(
            `DELETE FROM categories where categoryId = ?`,[categoryId],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateCategory: (data, callBack) =>{
        pool.query(
            `update categories set categoryName = ? , categoryImage = ? where categoryId = ?`,
            [
                data.categoryName,
                data.categoryImage,
                data.categoryId
            ],

            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }

        );
    }
}