import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllAdapters = async () => {
    return await prisma.adapter.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    image_url: true,
                    brand: true
                }
            }
        }
    });
}

export const createAdapter = async (adapterData) => {
    return await prisma.adapter.create({
        data: adapterData
    });
};

export const updateAdapter = async (adapterId, updateData) => {
    return await prisma.adapter.update({
        where: { id: adapterId },
        data: updateData
    });
};

export const deleteAdapter = async (adapterId) => {
    return await prisma.adapter.delete({
        where: { id: adapterId }
    });
};