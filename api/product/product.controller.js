const {createProduct,getAllProduct,getProductById,searchProduct,getProductId,updateProducts,viewComment} = require("./product.service");

module.exports = {
    getAllProduct: (req,res) => {
        getAllProduct( (err,results) =>{
            if(err){
                return res.status(401).json({
                    success:0,
                    message: "Unauthorized or token "
                });
            }
            return res.json({
                success:1,
                data: results
            });
        });
    },
    getProductId: (req,res) => {
        const id = req.query.categoryId;
        getProductId(id, (err,results)=>{
            if(err){
                console.log(err);
                return ;
            }
            if(!results){
                return res.status(401).json({
                    success: 0,
                    message: "The product is not exist"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    viewComment: (req,res) => {
        const id = req.query.productId;
        viewComment(id, (err,results)=>{
            if(results == "No comment"){
                return res.status(400).json({
                    success: 0,
                    message: "No comment"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    viewProductDetail: (req,res) => {
        const id = req.query.productId;
        getProductById(id, (err,results)=>{
            if(err){
                console.log(err);
                return ;
            }
            if(!results){
                return res.status(401).json({
                    success: 0,
                    message: "The product is not exist"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    updateProducts: (req,res)=> {
        const body = req.body;
        updateProducts(body,(err, results)=>{
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
    createProduct: (req,res)=>{
        const body = req.body;
        createProduct(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    success: 0,
                    message: "Can not create product"
                });
            }
            return res.status(200).json({
                success:1,
                message: "Created product successfully"
            });
        });
    },
    searchProduct: (req,res) => {
        const name = req.query.productName;
        searchProduct(name, (err,results)=>{
            if(err){
                console.log(err);
                return ;
            }
            if(!results){
                return res.status(401).json({
                    success: 0,
                    message: "The product is not exist"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    }

}