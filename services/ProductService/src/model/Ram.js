import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllRams = async () => {
    return await prisma.ram.findMany({
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
