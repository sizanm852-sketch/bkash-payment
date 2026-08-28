import express from "express";
import type { Express,Request,Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./route";



const port = process.env.PORT;

const app:Express = express();
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(bodyParser.json());


// Server listen
app.listen(port, ():void => {
    console.log(`Server started on port http://localhost:${port}`);
});

//bd
const db=async()=>{
    try {
        const connect=await mongoose.connect(process.env.db_url!);
        if(connect){
            console.log("MongoDB connected");
        }
    } catch (error) {
        console.log(error);
    }
}
db();
//route
app.use("/api", router)
app.use("/bkash", router)


// 404 route
app.use((req:Request, res:Response<string>):void => {
    res.status(404).send("No route found");
});

// 
//
//