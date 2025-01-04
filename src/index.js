// require("dotenv").config();
import dotenv from 'dotenv'
import connection from "./db/db.js";
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()

dotenv.config({
    path:'./.env'
})

app.use(cors({
    origin:"",
    credentials:true,
    methods:"POST,PUT,GET,PATCH,DELETE,HEAD"
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static())
app.use(cookieParser())


app.listen(process.env.PORT,()=>{
    console.log("App is listening...");
})

connection()