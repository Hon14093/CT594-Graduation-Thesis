import { getAllProducts } from "./model/Product.js";
import { 
    createBrand,
    getAllBrands
} from "./model/Brand.js";
import { 
    createCategories,
    getAllCategories,
} from "./model/Category.js";

export const returnAllProducts = async (req,res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({
            success: true,
            message: 'Get all products',
            products: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//---------------------------------------------------------------
export const returnAllBrands = async(req,res) => {
    try {
        const brands = await getAllBrands();
        res.status(200).json({
            success: true,
            message: 'Get all brands',
            brands: brands
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createNewBrand = async (req,res) => {
    try {
        const data = req.body;
        const newBrand = await createBrand(data);
        res.status(201).json({
            success: true,
            message: 'Brand created successfully',
            brand: newBrand
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//---------------------------------------------------------------
export const returnAllCategories = async (req,res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json({
            success: true,
            message: 'Get all categories',
            categories: categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createNewCategory = async (req,res) => {
    try {
        const data = req.body;
        const newCategory = await createCategories(data);
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category: newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}