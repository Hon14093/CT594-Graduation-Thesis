import { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductsByCategoryId
} from "../model/Product.js";
import { 
    createBrand,
    getAllBrands
} from "../model/Brand.js";
import { 
    createCategories,
    getAllCategories,
} from "../model/Category.js";

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

export const returnAllProductByCategory = async (req,res) => {
    try {
        const { category_id } = req.params;
        const products = await getAllProductsByCategoryId(category_id);
        res.status(200).json({
            success: true,
            message: 'Get all products by category',
            products: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createNewProduct = async (req,res) => {
    try {
        const data = req.body;
        const newProduct = await createProduct(data);
        
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const editProduct = async (req,res) => {
    try {
        const { product_id } = req.params;
        const data = req.body;

        if (!product_id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const updatedProduct = await updateProduct(product_id, data);

        return res.status(200).json({ 
            success: 1,
            message: 'Product updated successfully',
            updated_product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const removeProduct = async (req,res) => {
    try {
        const { product_id } = req.params;

        if (!product_id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const deletedProduct = await deleteProduct(product_id);

        return res.status(200).json({
            success: 1,
            message: 'Product deleted successfully',
            deleted_product: deletedProduct,
        })
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal server error" });
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