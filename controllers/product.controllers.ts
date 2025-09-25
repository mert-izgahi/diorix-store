import type { Request, Response } from "express";
import Product from "../models/product.model";


export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        result: products
    })
}


export const getProduct = async (req: Request, res: Response) => {
    const {id} = req.params;

    const product = await Product.findById(id);

    res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        result: product
    })
}


export const createProduct = async (req: Request, res: Response) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        result: product
    })
}


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        result: product
    })
}


export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        result: product
    })
}