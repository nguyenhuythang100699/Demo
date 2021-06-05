const{getAllProduct,viewProductDetail,createProduct,searchProduct,getProductId,updateProducts,viewComment} = require("./product.controller");

const router = require("express").Router();
const {checkToken,checkTokenAdmin} = require("../../auth/token_validation");

router.get("/GetAllProduct",checkToken,getAllProduct);
router.get("/ViewProductDetail",checkToken,viewProductDetail);
router.post("/create",checkTokenAdmin,createProduct);
router.get("/SearchProduct",checkToken,searchProduct);
router.get("/GetProductById",checkToken,getProductId);
router.patch("/updateProduct",checkTokenAdmin,updateProducts);
router.get("/GetReview",checkTokenAdmin,viewComment)


module.exports = router;