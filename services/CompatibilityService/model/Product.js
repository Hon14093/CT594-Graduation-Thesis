import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// For table in management page
export const getAllProducts = async () => {
    return await prisma.product.findMany({
        include: {
            category: true,
            brand: true
        }
    })
}

export const getProductById = async (laptopId) => {
    return await prisma.product.findUnique({
        where: {
            laptop_id: laptopId
        }
    })
}

