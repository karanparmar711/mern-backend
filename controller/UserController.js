import UserModel from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserController {
    static UserRegistration = async (req,res)=>{
        const{Name,Email,Password,ConfirmPassword,MobileNo}=req.body;
        // console.log(Name,Email,Password,ConfirmPassword,MobileNo);
        const user = await UserModel.findOne({Email:Email})
        if(user){
            res.send({"status":"failed","message":"user already exists"})
        }else{
            if(Name && Email && Password && ConfirmPassword && MobileNo){
                if(Password === ConfirmPassword){
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const HashedPassword = await bcrypt.hash(Password,salt)
                        const doc = new UserModel({
                            Name:Name,
                            Email:Email,
                            Password:HashedPassword,
                            MobileNo:MobileNo
                        })
                        await doc.save();
                        // res.status(200).render("login")
                        res.status(201).send({"status":"success","message":"Registration Successfully"})
                    } catch (error) {
                        console.log(error);
                        res.status(401).send({"status":"failed","message":"Unable to register"})
                    }
                }else{
                    res.status(401).send({"status":"failed","message":"both password are must match"})
                }
            }else{
                res.status(401).send({"status":"failed","message":"All fields are required"})
            }
        }

    }

    static UserLogin = async(req,res)=>{
        try {
            const {Email,Password}=req.body;
            if(Email && Password){
                const user = await UserModel.findOne({Email:Email})
                if(user != null){
                    const isMatch = await bcrypt.compare(Password,user.Password)
                    if((user.Email === Email) && isMatch){
                        // Generate JWT token
                        const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"5d"})
                        // res.status(200).redirect("/api/products/getall")

                        res.status(200).send({"status":"success","message":"Login Successfully","token":token})
                    }else{
                        res.status(401).send({"status":"failed","message":"Email or Password is not valid"})
                    }
                }else{
                    res.status(401).send({"status":"failed","message":"You are not registered user"})
                }
            }else{
                res.status(401).send({"status":"failed","message":"all fields are required"})
            }
        } catch (error) {
            console.log(error);
            res.status(401).send({"status":"failed","message":"Unable to login"})
        }
    }

    static LoggedUser = async(req,res)=>{
        res.status(201).send({"status":"success","LoggedUser":req.user})
    }

}

export default UserController;