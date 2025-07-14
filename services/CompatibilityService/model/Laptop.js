import { laptop_data } from "../test/laptop-data.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getLaptopById = async (laptop_id) => {
    // return laptop_data.filter((item) => item.laptop_id === laptop_id) || null;

    return await prisma.laptop.findFirst({
        where: {
            laptop_id: laptop_id
        }
    })
}