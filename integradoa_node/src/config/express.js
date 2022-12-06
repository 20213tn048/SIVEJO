//importations
const express= require("express"); //ve por el archivo y traeme
const cors = require("cors");
const {categoryRouter,userRouter,authRouter,productsRouter,requestsRouter} = require("../modules/controller/routes");
const {request, response} = require("express");
const {historyRouter,statusRouter} = require("../modules/controller/request/request.controller");


require("dotenv").config();//utilizar las propiedades del archivo .env
const app = express();//crear app
app.set("port",process.env.PORT || 3000);
app.use(
    cors({origins:"*"}) //permite recibir cualquier peticion con X origen
);
app.use(
    express.json({limit:"50mb"}) //maximo de nuestras peticiones
);

//Routes

app.get("/",(request,response)=>{
    response.send("bienvenida a la app Rest");
});
app.use("/api/user", userRouter);
app.use("/api/auth",authRouter);
app.use("/api/category",categoryRouter);
app.use("/api/products",productsRouter);
app.use("/api/requests",requestsRouter);
app.use("/api/history",historyRouter);
app.use("/api/status",statusRouter);
module.exports={ //exportar objeto
    app
};