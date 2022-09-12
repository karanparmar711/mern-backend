import jwt from "jsonwebtoken";
import UserModel from "../models/UserSchema.js";

var CheckUserAuth = async(req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try {
            token = authorization.split(" ")[1];
           
            // Verify Token
            const {userID}= jwt.verify(token,process.env.JWT_SECRET_KEY)

            // Get user From Token
            req.user = await UserModel.findById(userID).select('-Password')
            next()

        } catch (error) {
            console.log(error);
            res.status(401).send({"status":"failed","message":"Unauthorized User"})
        }
    }
    if(!token){
        res.status(401).send({"status":"failed","message":"Unauthorized User , No token"})
    }
}

export default CheckUserAuth;