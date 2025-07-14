import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllRams = async () => {
    return await prisma.ram.findMany({
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

export const createRam = async (ramData) => {
    return await prisma.ram.create({
        data: ramData
    });
};

export const updateRam = async (ramId, updateData) => {
    return await prisma.ram.update({
        where: { id: ramId },
        data: updateData
    });
};

export const deleteRam = async (ramId) => {
    return await prisma.ram.delete({
        where: { id: ramId }
    });
};