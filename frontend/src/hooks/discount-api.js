import axios from "axios";

const API_URL = 'http://localhost:5004';

export const createDiscount = async (data) => {
    try {
        const result = await axios.post(`${API_URL}/discount/create`, data)
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllDiscounts = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/discount/all`)
        console.log(result.data.discounts)
        setData(result.data.discounts);
    } catch (error) {
        console.log(error);
    }
}

export const updateDiscount = async (discount_id, data) => {
    try {
        const result = await axios.put(`${API_URL}/discount/update/${discount_id}`, data)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateDiscountStatus = async (discount_id, new_status) => {
    try {
        const result = await axios.put(`${API_URL}/discount/update-status/${discount_id}`, { new_status });
        console.log(result.data)
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const deleteDiscount = async (discount_id) => {
    try {
        const result = await axios.delete(`${API_URL}/discount/delete/${discount_id}`)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDiscountByCode = async (discount_code) => {
    try {
        const result = await axios.get(`${API_URL}/discount/find/${discount_code}`)
        return result.data.discount;
    } catch (error) {
        console.log(error);
    }
}