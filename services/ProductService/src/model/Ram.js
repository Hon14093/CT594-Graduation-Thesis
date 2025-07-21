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

export const getRamById = async (id) => {
    return await prisma.ram.findUnique({
        where: { ram_id: id }
    })
}

export const getRamVariations = async (product_id) => {
    const rams = await prisma.ram.findMany({
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

    return rams.map((ram) => ({
        ...ram,
        varDisplay: ram.capacity_gb + 'GB'
    }))
}

export const createRam = async (ramData) => {
    const { product_id, ...rest } = ramData;
    
    return await prisma.ram.create({
        data: {
            ...rest,
            product: {
                connect: { product_id },
            },
        },
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