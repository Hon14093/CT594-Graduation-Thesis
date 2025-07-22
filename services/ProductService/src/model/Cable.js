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

export const getCableById = async (id) => {
    return await prisma.cable.findUnique({
        where: { cable_id: id }
    })
}

export const getCableVariations = async (product_id) => {
    const cables = await prisma.cable.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    description: true,
                    image_url: true,
                    brand: true
                }
            }
        },
        where: {
            product_id: product_id
        }
    })

    return cables.map((item) => ({
        ...item,
        varDisplay: item.cable_model
    }))
}

export const createCable = async (cableData) => {
    const { product_id, ...rest } = cableData;

    return await prisma.cable.create({
        data: {
            ...rest,
            product: {
                connect: { product_id },
            },
        },
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