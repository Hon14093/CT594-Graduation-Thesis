import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createReview = async (data) => {
    return await prisma.review.create({ data });
}

export const getReviewsByProductId = async (productId)  => {
    return await prisma.review.findMany({
        where: { product_id: productId }
    })
}