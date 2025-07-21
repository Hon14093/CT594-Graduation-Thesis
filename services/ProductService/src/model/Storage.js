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

export const getStorageById = async (id) => {
    return await prisma.storage.findUnique({
        where: { storage_id: id }
    })
}

export const getStorageVariations = async (product_id) => {
    const storages = await prisma.storage.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    image_url: true,
                    brand: true
                }
            }
        },
        where: {
            product_id: product_id
        }
    })

    console.log(storages.price)

    return storages.map((storage) => ({
        ...storage,
        price: parseFloat(storage.price),
        varDisplay: storage.capacity_gb + " GB"
    }))

}

export const createStorage = async (storageData) => {
    const { product_id, ...rest } = storageData;
    
    return await prisma.storage.create({
        data: {
            ...rest,
            product: {
                connect: { product_id },
            },
        },
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