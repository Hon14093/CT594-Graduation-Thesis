import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDiscounts = async () => {
    return await prisma.discount.findMany();
}

export const getDiscountByCode = async (discount_code) => {
    return await prisma.discount.findFirst({
        where: { discount_code: discount_code }
    })
}

export const createDiscount = async (data) => {
    return await prisma.discount.create({
        data: data
    })
}

export const updateDiscount = async (discount_id, data) => {
    return await prisma.discount.update({
        where: { discount_id }, data
    })
}

export const updateDiscountStatus = async (discount_id, is_active) => {
    return await prisma.discount.update({
        where: { discount_id: discount_id },
        data: { is_active: is_active }
    })
}

export const deleteDiscount = async (discount_id) => {
    return await prisma.discount.delete({
        where: {
            discount_id: discount_id
        }
    })
}