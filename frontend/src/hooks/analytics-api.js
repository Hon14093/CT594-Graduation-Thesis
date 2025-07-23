import axios from "axios";

const API_URL = 'http://localhost:5004';

export const getAllStats = async (setData) => {
    try {
        const stats = await axios.get(`${API_URL}/analytic/all`);
        setData(stats.data.allStats);
        console.log('Stats', stats.data.allStats);
    } catch (error) {
        console.log(error);
    }
}

export const getPopularProducts = async (setPopularProducts) => {
    try {
        const result = await axios.get('http://localhost:5000/manage/product/popular');
        const popularProducts = result.data.popularProducts;

        const formattedData = popularProducts.map(item => {
            const nameKey = Object.keys(item).find(key => key.endsWith('_name'));
            const name = nameKey ? item[nameKey] : 'Unnamed';

            console.log('name', name, item.count)

            return {
                ...item,
                name: name,
                image_url: item.product.image_url?.[0] || '', // fallback if empty
            };
        });

        setPopularProducts(formattedData);
    } catch (error) {
        console.log(error);
    }
}

export const getMonthlyRevenues = async (setRevenues) => {
    try {
        const result = await axios.get(`${API_URL}/analytic/revenues`);
        setRevenues(result.data.revenues);
        console.log(result.data.revenues);
    } catch (error) {
        console.log(error);
    }
}

// for status chart
export const getDistribution = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/analytic/status-distribution`)
        console.log(result.data.distributions);
        setData(result.data.distributions)
    } catch (error) {
        console.log(error)
    }
}