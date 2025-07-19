import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCableById = async (cable_id) => {
    // return monitor_data.filter((item) => item.monitor_id === monitor_id);

    return await prisma.cable.findFirst({
        where: {
            cable_id: cable_id
        }
    })
}