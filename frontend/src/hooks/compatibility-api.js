import axios from "axios";

const API_URL = 'http://localhost:5001';

export const checkCompatibility = async (laptop_id, components) => {
    try {
        const params = new URLSearchParams();
        if (components.ram_id) params.append('ram_id', components.ram_id);
        if (components.storage_id) params.append('ssd_id', components.storage_id);
        if (components.dock_id) params.append('dock_id', components.dock_id);
        if (components.adapter_id) params.append('adapter_id', components.adapter_id);
        if (components.monitor_id) params.append('monitor_id', components.monitor_id);
        if (components.cable_id) params.append('cable_id', components.cable_id);

        // console.log('Sending params:', params.toString());
        const result = await axios.get(`${API_URL}/tool/check/${laptop_id}?${params.toString()}`);
        console.log('Response data:', result.data.response);
        return result.data.response;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const tempComponents = {
    ram_id: 'ccfddd0f-5387-4500-bfaf-02199ef8678c',
    monitor_id: 'eeddec2f-abed-4a91-84c4-d4ae08701eed'
};

// checkCompatibility('abfb0c54-21ab-450d-93f9-f683075ebff8', tempComponents)
// checkCompatibility('39816cb1-158b-4a21-aad9-69385233585e', tempComponents) 
// dell xps
