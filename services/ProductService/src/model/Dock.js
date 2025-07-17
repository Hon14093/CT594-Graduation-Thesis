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

export const getDockById = async (id) => {
    return await prisma.dock.findUnique({
        where: { dock_id: id }
    })
}

export const createDock = async (dockData) => {
    const { product_id, ...rest } = dockData;

    return await prisma.dock.create({
        data: {
            ...rest,
            product: {
                connect: { product_id },
            },
        },
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