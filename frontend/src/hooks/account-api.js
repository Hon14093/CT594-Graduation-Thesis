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