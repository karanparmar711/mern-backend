import express from "express";
const router = express.Router();
import UserController from "../controller/UserController.js";
import CheckUserAuth from "../middleware/AuthMiddleware.js";

// Route level Middleware
router.use("/LoggedUser",CheckUserAuth);

// Public Routes 
router.post("/register",UserController.UserRegistration);
router.post("/login",UserController.UserLogin);


// ejs form get
router.get("/register",(req,res)=>{
    res.render('register')
})

router.get("/login",(req,res)=>{
    res.render('login')
})



// Protected Routes
router.get("/LoggedUser",UserController.LoggedUser);


export default router;