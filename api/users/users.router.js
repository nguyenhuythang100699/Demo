const { 
    getUsers, 
    getUserById, 
    deleteUser, 
    updateUser,
    login
} = require("./users.controller");
const router = require("express").Router();
const {checkTokenAdmin,checkToken} = require("../../auth/token_validation");

router.get("/getUsers",checkTokenAdmin,getUsers);
router.get("/getUserById",checkTokenAdmin,getUserById);
router.patch("/updateUser",checkTokenAdmin,updateUser);
router.delete("/deleteUser",checkTokenAdmin,deleteUser);

module.exports = router;
