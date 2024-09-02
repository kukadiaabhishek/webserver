import app from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./db/database.js"

dotenv.config({
    path : './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);  
    })
    app.on("error" ,(error)=>{
        console.log("error" ,error)
        throw error
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed" ,err)
})
