import express from "express";
const router = express.Router();
import ProductController from "../controller/ProductController.js";
import productModel from "../models/ProductSchema.js";



// Product Routes

router.post("/products/add",ProductController.CreateProduct);
router.get("/products/getall",ProductController.GetallProducts);
router.get("/products/getById/:id",ProductController.GetProductsById);
router.put("/products/update/:id",ProductController.UpdateProduct);
router.delete("/products/delete/:id",ProductController.DeleteProduct);




export default router;