import { monitor_data } from "../test/monitor-data.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMonitorById = async (monitor_id) => {
    // return monitor_data.filter((item) => item.monitor_id === monitor_id);

    return await prisma.monitor.findFirst({
        where: {
            monitor_id: monitor_id
        }
    })
}