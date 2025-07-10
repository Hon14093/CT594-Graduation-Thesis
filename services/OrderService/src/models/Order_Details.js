import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getOrderDetailsByOrderId = async (orderId) => {
    return await prisma.order_details.findMany({
        where: {
            order_id: orderId
        }
    })
}