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

export const createLaptop = async (laptopData) => {
    return await prisma.laptop.create({
        data: laptopData
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