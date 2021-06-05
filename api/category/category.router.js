const{getAllCategory,createCategory, deleteCategory, updateCategory} = require("./category.controller");

const router = require("express").Router();
const {checkToken, checkTokenAdmin} = require("../../auth/token_validation");


router.get("/GetAllCategory",checkToken,getAllCategory);
router.post("/create",checkTokenAdmin,createCategory);
router.delete("/",checkTokenAdmin,deleteCategory);
router.patch("/updateCategory",checkTokenAdmin,updateCategory);




module.exports = router;