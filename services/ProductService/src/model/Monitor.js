import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllMonitors = async () => {
    return await prisma.monitor.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    image_url: true
                }
            }
        }
    });
}