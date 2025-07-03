import { laptop_data } from "../test/laptop-data.js";

export const getLaptopById = (laptop_id) => {
    return laptop_data.filter((item) => item.laptop_id === laptop_id) || null;
}