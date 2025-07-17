import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAccount = async (data) => {
    return await prisma.account.create({
        data: data
    })
}

export const findAccountByEmail = async (email) => {
    return await prisma.account.findUnique({
        select: {
            account_id: true,
            username: true,
            email: true,
            phone: true,
            date_created: true,
            password: true,
            role: {
                select: {
                    role_name: true
                }
            }
        },
        where: {
            email: email
        }
    })
}

export const getAccountInfo = async (account_id) => {
    const data = await prisma.account.findFirst({
        select: {
            account_id: true,
            username: true,
            email: true,
            phone: true,
            date_created: true,
            password: false,
            role: true
        },
        where: {account_id: account_id}
    });

    const formattedData = {
        ...data, 
        date_created: data.date_created.toISOString().slice(0, 10)
    };

    return formattedData;
}

export const getAllAccounts = async () => {
    const accounts = await prisma.account.findMany({
        select: {
            account_id: true,
            username: true,
            email: true,
            phone: true,
            date_created: true,
            password: false,
            role: true
        },
    });

    const formattedData = accounts.map(account => ({
        ...account,
        date_created: account.date_created.toISOString().slice(0, 10)
    }));

    return formattedData;
}