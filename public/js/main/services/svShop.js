const {checkToken} = require("../../../../auth/token_validation")
const{verifyUser} = require("../../../../api/login/login.service");
let app = angular.module("app.shop",[]);

app.factory("svShop",["$http", ($http)=>{
    return{
        verify: ()=>{

        }
    }
}]);