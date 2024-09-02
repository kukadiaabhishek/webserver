import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// import productRouter from "./routers/Product.router.js"
import productRouter from "./routers/Product.router.js"
import userRouter from "./routers/User.router.js"
import compradorRouter from "./routers/Comprador.router.js"
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))

app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"));
app.use(cookieParser())

app.use("/api/v1/user" , productRouter , userRouter , compradorRouter)


export default app;