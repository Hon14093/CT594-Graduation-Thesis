import axios from 'axios';
import { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductsByCategoryId
} from "../model/Product.js";
import { 
    createBrand,
    deleteBrand,
    getAllBrands,
    updateBrand
} from "../model/Brand.js";
import { 
    createCategories,
    deleteCategory,
    getAllCategories,
    updateCategory,
} from "../model/Category.js";
import { getAllLaptops } from '../model/Laptop.js';
import { getAllRams } from '../model/Ram.js';
import { getAllMonitors } from '../model/Monitor.js';
import { getAllCables } from '../model/Cable.js';
import { getAllDocks } from '../model/Dock.js';
import { getAllAdapters } from '../model/Adatper.js';
import { getAllStorages } from '../model/Storage.js';

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

export const editBrand = async (req, res) => {
    try {
        const { brand_id } = req.params;
        const data = req.body;
        if (!brand_id) {
            return res.status(400).json({ message: 'Brand ID is required' });
        }
        const updatedBrand = await updateBrand(parseInt(brand_id), data);
        res.status(200).json({
            success: true,
            message: 'Brand updated successfully',
            brand: updatedBrand
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeBrand = async (req, res) => {
    try {
        const { brand_id } = req.params;
        if (!brand_id) {
            return res.status(400).json({ message: 'Brand ID is required' });
        }
        const deletedBrand = await deleteBrand(parseInt(brand_id));
        res.status(200).json({
            success: true,
            message: 'Brand deleted successfully',
            brand: deletedBrand
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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

export const editCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const data = req.body;
        if (!category_id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }
        const updatedCategory = await updateCategory(parseInt(category_id), data);
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category: updatedCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        if (!category_id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }
        const deletedCategory = await deleteCategory(parseInt(category_id));
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            category: deletedCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





export const returnPopularProducts = async (req, res) => {
    try {
        // 1. Fetch completed orders from Order service
        const completedOrdersRes = await axios.get('http://localhost:5004/manage/order/completed');
        const completedOrders = completedOrdersRes.data.orders || [];

        console.log('fetch order completed', completedOrders)

        // 2. Extract order IDs
        const orderIds = completedOrders.map(order => order.order_id);

        // 3. For each order ID, get order details via GET request
        let allOrderDetails = [];

        for (const id of orderIds) {
            const orderDetailsRes = await axios.get(`http://localhost:5004/manage/order/details/all/${id}`);
            // console.log('fetch order details', orderDetailsRes)
            allOrderDetails.push(...(orderDetailsRes.data.details || []));
        }

        console.log('all order details', allOrderDetails)

        // 4. Fetch all components
        const laptops = await getAllLaptops();
        const rams = await getAllRams();
        const monitors = await getAllMonitors();
        const cables = await getAllCables();
        const docks = await getAllDocks();
        const adapters = await getAllAdapters();
        const storages = await getAllStorages();

        const allComponents = [
            ...laptops,
            ...rams,
            ...monitors,
            ...cables,
            ...docks,
            ...adapters,
            ...storages
        ];

        // 5. Count frequency of item_ref_id in order details
        const frequencyMap = {};

        for (const detail of allOrderDetails) {
            const itemId = detail.item_ref_id;
            frequencyMap[itemId] = (frequencyMap[itemId] || 0) + 1;
        }

        // 6. Attach frequency to each product and filter those that were actually sold
        const productsWithCount = allComponents
            .filter(prod => frequencyMap[prod.laptop_id || prod.ram_id || prod.monitor_id || prod.cable_id || prod.dock_id || prod.adapter_id || prod.storage_id])
            .map(prod => {
                const id =
                    prod.laptop_id ||
                    prod.ram_id ||
                    prod.monitor_id ||
                    prod.cable_id ||
                    prod.dock_id ||
                    prod.adapter_id ||
                    prod.storage_id;

                return {
                    ...prod,
                    item_ref_id: id,
                    count: frequencyMap[id]
                };
            });

        // 7. Sort by count DESC and return
        const sortedProducts = productsWithCount.sort((a, b) => b.count - a.count);

        res.status(200).json({ popularProducts: sortedProducts });

    } catch (error) {
        console.error('Error in returnPopularProducts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchProduct = async (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Missing query' });

    try {
        const laptops = await getAllLaptops();
        const rams = await getAllRams();
        const monitors = await getAllMonitors();
        const cables = await getAllCables();
        const docks = await getAllDocks();
        const adapters = await getAllAdapters();
        const storages = await getAllStorages();

        const allComponents = [
            ...laptops,
            ...rams,
            ...monitors,
            ...cables,
            ...docks,
            ...adapters,
            ...storages
        ];

        const filtered = allComponents.filter(item => {
            const nameKey = Object.keys(item).find(key => key.endsWith('_name'));
            if (!nameKey) return false; // If no name field found, exclude this item

            const nameValue = item[nameKey];
            return nameValue?.toLowerCase().includes(q.toLowerCase());
        });

        res.json(filtered);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}