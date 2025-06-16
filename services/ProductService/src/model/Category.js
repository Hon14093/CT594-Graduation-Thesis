import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCategories = async () => {
    return await prisma.category.findMany();
}

export const createCategories = async (data) => {
    return await prisma.category.create({ data });
}