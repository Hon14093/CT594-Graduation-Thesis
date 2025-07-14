import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllDocks = async () => {
    return await prisma.dock.findMany({
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

export const createDock = async (dockData) => {
    return await prisma.dock.create({
        data: dockData
    });
};

export const updateDock = async (dockId, updateData) => {
    return await prisma.dock.update({
        where: { id: dockId },
        data: updateData
    });
};

export const deleteDock = async (dockId) => {
    return await prisma.dock.delete({
        where: { id: dockId }
    });
};