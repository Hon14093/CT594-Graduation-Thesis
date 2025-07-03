import { ram_data } from "../test/ram-data.js";

export const getRamById = (ram_id) => {
    return ram_data.filter((item) => item.ram_id === ram_id);
}