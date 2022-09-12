import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    Email:{type:String,required:true,trim:true},
    Password:{type:String,required:true,trim:true},
    // Tc:{type:Boolean,required:true}
    MobileNo:{type:Number,required:true,trim:true}
})

const UserModel = mongoose.model("users",UserSchema)

export default UserModel;






