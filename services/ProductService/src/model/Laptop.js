import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const getAllLaptops = async () => {
    return await prisma.laptop.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    image_url: true
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
                    image_url: true
                }
            }
        },
        where: {
            product_id: product_id
        }
    })
}