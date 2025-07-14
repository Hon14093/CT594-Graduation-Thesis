import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllStorages = async () => {
    return prisma.storage.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    image_url: true,
                    brand: true
                }
            }
        }
    })
}

export const createStorage = async (storageData) => {
    return await prisma.storage.create({
        data: storageData
    });
};

export const updateStorage = async (storageId, updateData) => {
    return await prisma.storage.update({
        where: { id: storageId },
        data: updateData
    });
};

export const deleteStorage = async (storageId) => {
    return await prisma.storage.delete({
        where: { id: storageId }
    });
};