if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const userRouter = require("./api/users/users.router");
const {regularRegister, checkExist} = require("./api/register/register.controller");
const {login} = require("./api/login/login.controller");
const {order,getOrderDetail,ordered, checkOrder,delivered,checkIfExpired,deleteOrder} = require("./api/order/order.controller");
const {review} = require("./api/review/review.controller");
const {checkTokenAdmin} = require("./auth/token_validation");
const categoryRouter = require("./api/category/category.router");
const productRouter = require("./api/product/product.router");
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.urlencoded({ extended: false }))
const cron = require('node-cron');
cron.schedule('0 0 * * *', () => {
    checkIfExpired();
});



port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser(process.env.COOKIES_KEY));
app.use("/api/users",userRouter);
app.use("/api/Category",categoryRouter);
app.use("/api/Product", productRouter);
app.delete("/api/OrderDetail/CancelOrderDetail",deleteOrder);
app.post("/api/order",order);
app.post("/api/Ordered",ordered);
app.post("/api/review",review);
app.get("/api/OrderDetail", getOrderDetail);
app.post("/api/register",checkExist,regularRegister);
app.post("/api/login",login);
app.get("/api/Order/ViewOrder", checkTokenAdmin, checkOrder);
app.put("/api/Order/ViewOrder", checkTokenAdmin, delivered);



app.get('/' , (req , res)=>{
   res.render("index");
   console.log(req.cookies.token);
});
app.get('/register' , (req , res)=>{

    res.render("register");
 
 });
 app.get('/login' , (req , res)=>{
    res.render("login");
 });


app.get("/api", (req,res)=>{
    res.json({
        success:1,
        message: "This is rest apis Working"
    })
});

app.listen(port, ()=>{
    console.log("Server up and running on PORT: ", process.env.PORT);
});