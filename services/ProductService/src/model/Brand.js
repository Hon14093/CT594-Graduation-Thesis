import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllBrands = async () => {
    return await prisma.brand.findMany();
}

export const createBrand = async (data) => {
    return await prisma.brand.create({ data });
}