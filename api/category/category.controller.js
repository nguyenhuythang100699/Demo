const {getAllCategory,createCategory,deleteCategory,checkIfExpired,  updateCategory} = require("./category.service");

module.exports = {
    getAllCategory: (req,res)=>{
        getAllCategory( (err,results) =>{
            if(err){
                return res.status(401).json({
                    success:0,
                    message: "failed when trying to get all categories"
                });
            }
            return res.json({
                success:1,
                data: results
            });
        });
    },
    createCategory: (req,res)=>{
        const category = req.body;
        createCategory(category,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    success: 0,
                    message: "Can not create category, unauthorized"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    updateCategory: (req,res)=> {
        const body = req.body;
        updateCategory(body,(err, results)=>{
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
                message: "updated successfully"
            });
        });
    },
    deleteCategory: (req,res)=>{
        const categoryId = req.query.categoryId;
        deleteCategory(categoryId,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    success: 0,
                    message: "Can not delete category, unauthorized"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    }
}