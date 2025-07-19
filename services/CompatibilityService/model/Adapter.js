import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAdapterById = async (adapter_id) => {
    // return monitor_data.filter((item) => item.monitor_id === monitor_id);

    return await prisma.adapter.findFirst({
        where: {
            adapter_id: adapter_id
        }
    })
}