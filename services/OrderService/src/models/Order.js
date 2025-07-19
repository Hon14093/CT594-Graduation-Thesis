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