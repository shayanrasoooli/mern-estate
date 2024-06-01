import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user.route.js";
import authRouter from "./Routes/auth.route.js";
dotenv.config();



mongoose.connect(process.env.MANGO).then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
})



const app = express();
app.use(express.json());

app.listen(5000 , () => {
    console.log('server in running in port 5000!');
})

app.use("/api/user"  , userRouter);
app.use("/api/auth"  , authRouter)

app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error'
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message, 
    })
})