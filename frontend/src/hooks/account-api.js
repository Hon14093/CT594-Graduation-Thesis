import axios from "axios";

const API_URL = 'http://localhost:5002';

export const getAccountInfoById = async (account_id, setData) => {
    try {
        const result = await axios.get(`${API_URL}/account/find/${account_id}`);
        console.log(result.data)
        setData(result.data.account);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getAccounts = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/account/all`);
        console.log(result.data)
        setData(result.data.accounts);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

// This is for employee and admin account creation
export const createAccount = async (data) => {
    try {
        const result = await axios.post(`${API_URL}/account/create`, data);
        console.log(result.data);
        return result;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export const updateAccountStatus = async (account_id, new_status) => {
    try {
        const result = await axios.put(`${API_URL}/account/update-status/${account_id}`, { new_status });
        console.log(result.data)
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const deleteAccount = async (account_id) => {
    try {
        const result = await axios.delete(`${API_URL}/account/delete/${account_id}`);
        console.log(result.data);
        return result;
    } catch (error) {
        console.error("Error deleting account:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}