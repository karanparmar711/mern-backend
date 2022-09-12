import dotenv from "dotenv";
dotenv.config();
import ProductRoutes from "../server/routes/Product.js";
import UserRoutes from "../server/routes/User.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then (() => console.log('Connected to MongoDB...'))

// JSON
app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.urlencoded({extended:false}))
// app.use(express.json());


// Load Routes
app.use("/api",ProductRoutes);
app.use("/api/user",UserRoutes)



app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
});

