import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllMonitors = async () => {
    return await prisma.monitor.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    image_url: true,
                    brand: true
                }
            }
        }
    });
}

export const getMonitorById = async (id) => {
    return await prisma.monitor.findUnique({
        where: { monitor_id: id }
    })
}

export const createMonitor = async (monitorData) => {
    const { product_id, ...rest } = monitorData;
    
    return await prisma.monitor.create({
        data: {
            ...rest,
            product: {
                connect: { product_id },
            },
        },
    });
};

export const updateMonitor = async (monitorId, updateData) => {
    return await prisma.monitor.update({
        where: { id: monitorId },
        data: updateData
    });
};

export const deleteMonitor = async (monitorId) => {
    return await prisma.monitor.delete({
        where: { id: monitorId }
    });
};