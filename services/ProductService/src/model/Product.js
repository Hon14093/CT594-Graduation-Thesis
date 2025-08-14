import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// For table in management page
export const getAllProducts = async () => {
    return await prisma.product.findMany({
        include: {
            category: true,
            brand: true
        },
        orderBy: {
            category_id: 'asc'
        }
    })
}

export const getAllProductsByCategoryId = async (category_id) => {
    return await prisma.product.findMany({
        where: {
            category: {
                category_id: parseInt(category_id),
            }
        }
    })
}

export const createProduct = async (data) => {
    return await prisma.product.create({ data });
}

export const updateProduct = async (product_id, data) => {
    return await prisma.product.update({
        where: { product_id },
        data
    })
}

export const deleteProduct = async (product_id) => {
    return await prisma.product.delete({
        where: { product_id }
    })
}