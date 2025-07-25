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

export const getMonitorVariations = async (product_id) => {
    const monitors = await prisma.monitor.findMany({
        include: {
            product: {
                select: { 
                    product_name: true, 
                    description: true,
                    image_url: true,
                    brand: true
                }
            }
        },
        where: {
            product_id: product_id
        }
    })

    return monitors.map((item) => ({
        ...item,
        varDisplay: item.screen_size_inches + ' inch ' + item.refresh_rate_hz + 'Hz ' + item.panel
    }))
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
        where: { monitor_id: monitorId },
        data: updateData
    });
};

export const deleteMonitor = async (monitorId) => {
    return await prisma.monitor.delete({
        where: { monitor_id: monitorId }
    });
};