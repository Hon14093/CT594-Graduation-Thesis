import axios from "axios";

const API_URL = 'http://localhost:5000';

export const getProducts = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/admin/product/all`);
        console.log(result.data);
        setData(result.data.products);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}


//-----------------------------------------------------------
export const getBrands = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/admin/product/brands/all`);
        console.log(result.data);
        setData(result.data.brands);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const createBrand = async (brand) => {
    try {
        const result = await axios.post(`${API_URL}/admin/product/brands/create`, brand);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//-----------------------------------------------------------
export const getCategories = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/admin/product/categories/all`);
        console.log(result.data);
        setData(result.data.categories);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const createCategories = async (category) => {
    try {
        const result = await axios.post(`${API_URL}/admin/product/categories/create`, category);
        return result;
    } catch (error) {
        console.log(error);
    }
}