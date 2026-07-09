import mongoose, { Schema } from "mongoose";
import { config } from "./config.js";



export async function ConnectToDB() {
    try{
        mongoose.connect(config.MONGO_URI)
        .then(()=>{
            console.log("Database is Connect")
        })

    }catch(err){
        console.log(err)
    }
}