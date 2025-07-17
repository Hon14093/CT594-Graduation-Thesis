import axios from "axios";

const API_URL = 'http://localhost:5000';

export const getProducts = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/all`);
        console.log(result.data.products)
        setData(result.data.products);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getProductsByCategoryId = async (setData, category_id) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/category-id/${category_id}`);
        console.log(result.data.products)
        setData(result.data.products);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const createProduct = async (product) => {
    try {
        const result = await axios.post(`${API_URL}/manage/product/create`, product);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const updateProduct = async (product_id, data) => {
    try {
        const result = await axios.put(`${API_URL}/manage/product/update/${product_id}`, data);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const deleteProduct = async (product_id) => {
    try {
        const result = await axios.delete(`${API_URL}/manage/product/delete/${product_id}`);
        return result;
    } catch (error) {
        console.error(error);
    }
}

//-----------------------------------------------------------
export const getBrands = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/brands/all`);
        setData(result.data.brands);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const createBrand = async (brand) => {
    try {
        const result = await axios.post(`${API_URL}/manage/product/brands/create`, brand);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//-----------------------------------------------------------
export const getCategories = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/categories/all`);
        setData(result.data.categories);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const createCategories = async (category) => {
    try {
        const result = await axios.post(`${API_URL}/manage/product/categories/create`, category);
        return result;
    } catch (error) {
        console.log(error);
    }
}