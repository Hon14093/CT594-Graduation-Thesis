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

export const getAdapterById = async (id) => {
    return await prisma.adapter.findUnique({
        where: { adapter_id: id }
    })
}

export const getAdapterVariations = async (product_id) => {
    const items = await prisma.adapter.findMany({
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

    return items.map((item) => ({
        ...item,
        varDisplay: item.adapter_model
    }))
}

export const createAdapter = async (adapterData) => {
    const { product_id, ...rest } = adapterData;

    return await prisma.adapter.create({
        data: {
            ...rest,
            product: {
                connect: { product_id },
            },
        },
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