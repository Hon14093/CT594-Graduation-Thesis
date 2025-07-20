import axios from "axios";

const API_URL = 'http://localhost:5002';

export const getAddressesByAccountId = async (account_id, setData) => {
    try {
        const result = await axios.get(`${API_URL}/address/find/${account_id}`);
        console.log(result)
        setData(result.data.addresses);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const createAddress = async (data) => {
    try {
        const result = await axios.post(`${API_URL}/address/create`, data);
        return result;
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const updateAddress = async (address_id, data) => {
    try {
        const response = await axios.put(`${API_URL}/address/update/${address_id}`, data);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteAddress = async (address_id) => {
    try {
        const response = await axios.delete(`${API_URL}/address/delete/${address_id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}