import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllStorages = async () => {
    const res = await prisma.storage.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    image_url: true,
                    brand: true
                }
            }
        },
        orderBy: {
            storage_name: 'desc'
        }
    })

    console.log(res)

    return res.map((storage) => ({
        ...storage,
        price: parseFloat(storage.price),
    }))
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

    console.log(storages)

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
        where: { storage_id: storageId },
        data: updateData
    });
};

export const deleteStorage = async (storageId) => {
    return await prisma.storage.delete({
        where: { storage_id: storageId }
    });
};