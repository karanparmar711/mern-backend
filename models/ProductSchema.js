import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    productName:String,
    category:String,
    price:String
})

const productModel = mongoose.model("products",productSchema);

export default productModel;