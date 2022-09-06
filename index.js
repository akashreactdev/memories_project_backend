import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import router
import router from "./src/routes/posts.js";
import userRoutes from "./src/routes/user.js"
//import db connection
import {conn} from "../server/src/db/conn.js"
import dotenv from "dotenv"
const app = express()

//database connection used
export {conn}

//port requiredfdsfsdfsdfsd
const port = process.env.PORT || 5000;
dotenv.config();

// app.use(express.json())
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use("/posts",router);
app.use("/user",userRoutes)


app.listen(port,()=>console.log(`Server is Running : ${port}`));