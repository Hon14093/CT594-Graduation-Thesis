import { subMonths, endOfMonth, format, startOfMonth } from 'date-fns'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOrder = async (data) => {
    return await prisma.order.create({
        data: data
    })
}

const includeObject = {
    // Account: {
    //     include: {
    //         password: false,
    //         is_admin: false,
    //         date_created: false
    //     }
    // },
    order_status: true,
    discount: true,
    shipping_method: true
}

export const getAllOrders = async () => {
    const orders = await prisma.order.findMany({
        include: includeObject,
        orderBy: {
            order_date: 'desc',
        }
    });

    return orders.map(order => ({
        ...order,
        order_date: order.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const getUnprocessedOrders = async () => {
    const result = await prisma.order.findMany({
        include: includeObject,
        where: { status_id: 1 },
        orderBy: { order_date: 'desc' }
    })

    return result.map(res => ({
        ...res,
        order_total: res.order_total.toLocaleString() + ' vnđ',
        order_date: res.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const getRejectedOrders = async () => {
    const result = await prisma.order.findMany({
        include: includeObject,
        where: {
            status_id: 6
        },
        orderBy: { order_date: 'desc' }
    })

    return result.map(res => ({
        ...res,
        order_total: res.order_total.toLocaleString() + ' vnđ',
        order_date: res.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const getRemainingOrders = async () => {
    const orders = await prisma.order.findMany({
        include: includeObject,
        where: {
            NOT: [
                { status_id: 1 }, // Exclude unprocessed status
                { status_id: 6 }  // Exclude cancelled status
            ]
        },
        orderBy: { order_date: 'desc' }
    })

    return orders.map(order => ({
        ...order,
        order_total: order.order_total.toLocaleString() + ' vnđ',
        order_date: order.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const getOrdersByAccountId = async (account_id) => {
    const orders = await prisma.order.findMany({
        include: includeObject,
        where: {
            account_id: account_id
        },
        orderBy: { order_date: 'desc' }
    })

    return orders.map(order => ({
        ...order,
        order_total: order.order_total.toLocaleString() + ' vnđ',
        order_date: order.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const updateOrderStatus = async (order_id, statusId) => {
    return await prisma.order.update({
        where: { order_id },
        data: {
            status_id: statusId
        }
    })
}




// analytics stuffs ------------------------------------------------
export const getTotalRevenue = async () => {
    return await prisma.order.aggregate({
        _sum: {
            order_total: true
        }
    });
}

export const getTotalRevenueLast30Days = async () => {
    return await prisma.order.aggregate({
        _sum: {
            order_total: true
        },
        where: {
            order_date: {
                gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
            }
        }
    });
}

export const countOrders = async () => {
    return await prisma.order.count();
}

export const countUnprocessedOrders = async () => {
    return await prisma.order.count({
        where: {
            status_id: 1
        }
    });
}

export const countOrdersLast30Days = async () => {
    return await prisma.order.count({
        where: {
            order_date: {
                gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
            }
        }
    });
};

export const getOrderStatusDistribution = async () => {
    // Step 1: Fetch all possible status names
    const statusNames = await prisma.order_status.findMany({
        select: {
            status_id: true,
            status_name: true
        }
    });

    // Step 2: Get the count of each order status from the Orders table
    const result = await prisma.order.groupBy({
        by: ['status_id'],
        _count: {
            status_id: true
        }
    });

    // Step 3: Convert the result into a map for easy lookup
    const statusCounts = result.reduce((acc, item) => {
        acc[item.status_id] = item._count.status_id;
        return acc;
    }, {});

    // Step 4: Merge statusNames with counts, defaulting to 0 if not found
    return statusNames.map(status => ({
        status: status.status_name,
        count: statusCounts[status.status_id] || 0
    }));
};

export const getMonthlyRevenues = async () => {
    try {
        const currentDate = new Date();
        const months = [];

        for (let i=11; i>=0; i--) {
            const date = subMonths(currentDate, i);
            months.push({
                month: format(date, 'yyyy-MM'),
                startDate: startOfMonth(date),
                endDate: endOfMonth(date)
            });
        }

        const revenueData = await Promise.all(
            months.map(async ({month, startDate, endDate}) => {
                const revenue = await prisma.order.aggregate({
                    where: {
                        status_id: 5,
                        order_date: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                    _sum: {
                        order_total: true,
                    }
                });

                return {
                    month,
                    revenue: revenue._sum.order_total || 0,
                };
            })
        );

        return revenueData;
    } catch (error) {
        console.error("Error fetching monthly revenue:", error);
        throw new Error("Failed to retrieve revenue data");
    }
}

// for popular products ----------------------
export const getCompletedOrders = async () => {
    return await prisma.order.findMany({
        select: { order_id: true },
        where: { status_id: 5 }
    })
}