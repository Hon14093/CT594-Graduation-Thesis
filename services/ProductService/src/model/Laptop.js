import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const getAllLaptops = async () => {
    return await prisma.laptop.findMany({
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

// For product details page
export const getAllProductVariations = async (product_id) => {
    return await prisma.laptop.findMany({
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
}

export const getLaptopVariations = async (product_id) => {
    const laptops = await prisma.laptop.findMany({
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

    return laptops.map((item) => ({
        ...item,
        varDisplay: item.cpu + ' ' + item.gpu
    }))
}

export const getLaptopById = async (id) => {
    return await prisma.laptop.findUnique({
        where: { laptop_id: id }
    })
}

export const createLaptop = async (laptopData) => {
    const { product_id, ...rest } = laptopData;

    return await prisma.laptop.create({
        data: {
            ...rest,
            product: {
                connect: { product_id },
            },
        },
    });
};

export const updateLaptop = async (laptopId, updateData) => {
    return await prisma.laptop.update({
        where: { id: laptopId },
        data: updateData
    });
};

export const deleteLaptop = async (laptopId) => {
    return await prisma.laptop.delete({
        where: { id: laptopId }
    });
};