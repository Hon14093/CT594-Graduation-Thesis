import axios from "axios";

const API_URL = 'http://localhost:5000';

export const getLaptops = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/laptops/all`);
        console.log(result.data.laptops);
        setData(result.data.laptops);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getLaptopVariations = async (product_id, setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/laptops/variations/${product_id}`);
        console.log(result.data.laptops);
        setData(result.data.laptops);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}