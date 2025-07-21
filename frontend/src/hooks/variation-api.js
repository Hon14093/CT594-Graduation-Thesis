import axios from "axios";

const API_URL = 'http://localhost:5000';


export const getVariations = async (type, id, setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/variations/${type}/${id}`)
        console.log(result.data.variations);
        setData(result.data.variations);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

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

export const getRAMs = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/rams/all`);
        console.log(result.data.rams);
        setData(result.data.rams);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getMonitors = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/monitors/all`);
        console.log(result.data.monitors);
        setData(result.data.monitors);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getDocks = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/docks/all`);
        console.log(result.data.docks);
        setData(result.data.docks);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getStorages = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/storages/all`);
        console.log(result.data.storages);
        setData(result.data.storages);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getCables = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/cables/all`);
        console.log(result.data.cables);
        setData(result.data.cables);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getAdapters = async (setData) => {
    try {
        const result = await axios.get(`${API_URL}/manage/product/adapters/all`);
        console.log(result.data.adapters);
        setData(result.data.adapters);
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

// Laptops
export const createLaptop = async (data) => {
    return await axios.post(`${API_URL}/manage/product/laptops/create`, data);
};
export const updateLaptop = async (id, data) => {
    return await axios.put(`${API_URL}/manage/product/laptops/update/${id}`, data);
};
export const deleteLaptop = async (id) => {
    return await axios.delete(`${API_URL}/manage/product/laptops/delete/${id}`);
};

// RAMs
export const createRam = async (data) => {
    return await axios.post(`${API_URL}/manage/product/rams/create`, data);
};
export const updateRam = async (id, data) => {
    return await axios.put(`${API_URL}/manage/product/rams/update/${id}`, data);
};
export const deleteRam = async (id) => {
    return await axios.delete(`${API_URL}/manage/product/rams/delete/${id}`);
};

// Storages
export const createStorage = async (data) => {
    return await axios.post(`${API_URL}/manage/product/storages/create`, data);
};
export const updateStorage = async (id, data) => {
    return await axios.put(`${API_URL}/manage/product/storages/update/${id}`, data);
};
export const deleteStorage = async (id) => {
    return await axios.delete(`${API_URL}/manage/product/storages/delete/${id}`);
};

// Cables
export const createCable = async (data) => {
    return await axios.post(`${API_URL}/manage/product/cables/create`, data);
};
export const updateCable = async (id, data) => {
    return await axios.put(`${API_URL}/manage/product/cables/update/${id}`, data);
};
export const deleteCable = async (id) => {
    return await axios.delete(`${API_URL}/manage/product/cables/delete/${id}`);
};

// Monitors
export const createMonitor = async (data) => {
    return await axios.post(`${API_URL}/manage/product/monitors/create`, data);
};
export const updateMonitor = async (id, data) => {
    return await axios.put(`${API_URL}/manage/product/monitors/update/${id}`, data);
};
export const deleteMonitor = async (id) => {
    return await axios.delete(`${API_URL}/manage/product/monitors/delete/${id}`);
};

// Adapters
export const createAdapter = async (data) => {
    return await axios.post(`${API_URL}/manage/product/adapters/create`, data);
};
export const updateAdapter = async (id, data) => {
    return await axios.put(`${API_URL}/manage/product/adapters/update/${id}`, data);
};
export const deleteAdapter = async (id) => {
    return await axios.delete(`${API_URL}/manage/product/adapters/delete/${id}`);
};

// Docks
export const createDock = async (data) => {
    return await axios.post(`${API_URL}/manage/product/docks/create`, data);
};
export const updateDock = async (id, data) => {
    return await axios.put(`${API_URL}/manage/product/docks/update/${id}`, data);
};
export const deleteDock = async (id) => {
    return await axios.delete(`${API_URL}/manage/product/docks/delete/${id}`);
};