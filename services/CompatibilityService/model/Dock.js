import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getDockById = async (dock_id) => {
    return await prisma.dock.findFirst({
        where: {
            dock_id: dock_id
        }
    })
}