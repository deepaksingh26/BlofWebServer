import express from 'express';
import Connection from './database/db.js';
import dotenv from "dotenv";
import router from './Routes/route.js'
import cookieParser from 'cookie-parser';  
import cors from 'cors';
import bodyParser from 'body-parser';

const app=express();

dotenv.config({path:"./config/config.env"});
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);
const PORT=7000;



app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});

Connection();