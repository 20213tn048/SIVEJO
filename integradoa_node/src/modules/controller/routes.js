const {userRouter} = require ( "./user/user.controller");
const {authRouter} = require("./auth/auth.controller");
const {categoryRouter} = require("./category/category.controller")
const {productsRouter} = require("./products/products.controller");
const {requestsRouter} = require("./request/request.controller");
module.exports = {
    userRouter,
    authRouter,
    categoryRouter,
    productsRouter,
    requestsRouter

};