import { storage_data } from "../test/storage-data.js";

export const getStorageById = (storage_id) => {
    return storage_data.filter((item) => item.storage_id === storage_id);
}