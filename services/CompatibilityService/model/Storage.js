import { storage_data } from "../test/storage-data.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStorageById = async (storage_id) => {
    // return storage_data.filter((item) => item.storage_id === storage_id);

    return await prisma.storage.findFirst({
        where: {
            storage_id: storage_id
        }
    })
}