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

export const getAllAddresses = async () => {
    return await prisma.address.findMany();
}

export const getAddressById = async (address_id) => {
    return await prisma.address.findUnique({
        where: {
            address_id: address_id
        }
    })
}