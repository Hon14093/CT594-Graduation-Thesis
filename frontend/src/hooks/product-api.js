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