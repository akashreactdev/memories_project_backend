import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const conn = mongoose.connect(process.env.DB_CONNECTION_URL).then(()=>{
    console.log("Database Connection Successfully");
}).catch(()=>{
    console.log("Database Connection failed");
})