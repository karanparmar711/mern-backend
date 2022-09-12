import productModel from "../models/ProductSchema.js";
import mongoose from "mongoose";

class ProductController {
  static CreateProduct = async (req, res) => {
    try {
      const Product = new productModel(req.body);
      console.log(Product);
      const result = await Product.save();
      res.status(201).send({
        data: result,
        success: true,
        message: "product added successfully...",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static GetallProducts = async (req, res) => {
    try {
      const result = await productModel.find();
      res.status(201).send({
        data: result,
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static GetProductsById = async (req, res) => {
    try {
      const result = await productModel.findById(req.params.id);
      res.status(201).send({
        data: result,
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static UpdateProduct = async (req, res) => {
    try {
      const result = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(201).send({
        data: result,
        success: true,
        message: "product updated successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static DeleteProduct = async (req, res) => {
    try {
      const result = await productModel.findByIdAndDelete(req.params.id);
      res.status(201).send({
        data: result,
        success: true,
        message: "product deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProductController;
