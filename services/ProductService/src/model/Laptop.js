import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllLaptops = async () => {
    return await prisma.laptop.findMany({
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