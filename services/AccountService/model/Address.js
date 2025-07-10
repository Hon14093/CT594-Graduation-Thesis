import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAddress = async (data) => {
    return await prisma.address.create({
        data: data
    })
}

export const getAddressesByAccountId = async (account_id) => {
    return await prisma.address.findMany({
        where: {
            account_id: account_id
        }
    })
}