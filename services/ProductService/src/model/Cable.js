import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCables = async () => {
    return await prisma.cable.findMany({
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

export const createCable = async (cableData) => {
    return await prisma.cable.create({
        data: cableData
    });
};

export const updateCable = async (cableId, updateData) => {
    return await prisma.cable.update({
        where: { id: cableId },
        data: updateData
    });
};

export const deleteCable = async (cableId) => {
    return await prisma.cable.delete({
        where: { id: cableId }
    });
};