import { ram_data } from "../test/ram-data.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRamById = async (ram_id) => {
    // return ram_data.filter((item) => item.ram_id === ram_id);

    return await prisma.ram.findFirst({
        where: {
            ram_id: ram_id
        }
    })
}