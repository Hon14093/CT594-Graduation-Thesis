import axios from "axios";
import { createOrder, getAllOrders, getUnprocessedOrders } from "../models/Order.js";
import { PrismaClient } from "@prisma/client";
import { getOrderDetailsByOrderId } from "../models/Order_Details.js";
const prisma = new PrismaClient();

// unused, might delete
export const createNewOrder = async (req,res) => {
    try {
        const data = req.body;
        const newOrder = await createOrder(data);

        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            order: newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// used in paymentController
export const createOrderWithDetails = async (data) => {
    const {
        account_id,
        address_id,
        items,
        order_total,
        note,
        pm_id,
        sm_id,
        discount_id,
        status_id = 1,
    } = data;

    return await prisma.order.create({
        data: {
            account_id,
            address_id,
            order_total,
            note,
            pm_id,
            sm_id,
            discount_id,
            status_id,
            order_details: {
                create: items.map((item) => ({
                    item_ref_id: item.item_ref_id,
                    quantity: item.quantity,
                    subtotal: item.sub_total,
                    item_type: item.item_type,
                })),
            },
        },
        include: {
            order_details: true,
        },
    });
};

// merge account data with orders
function mergeData(orders, accounts, addresses) {
    const accountMap = new Map();
    accounts.forEach(acc => {
        accountMap.set(acc.account_id, acc);
    });

    const addressMap = new Map();
    addresses.forEach(address => {
        addressMap.set(address.address_id, address);
    });

    return orders.map(order => ({
        ...order,
        account: accountMap.get(order.account_id) || null,
        address: addressMap.get(order.address_id) || null
    }));
}

export const returnAllOrders = async (req,res) => {
    try {
        const orders = await getAllOrders();

        const accountRes = await axios.get('http://localhost:5002/account/all');
        const accounts = accountRes.data.accounts;

        const addressRes = await axios.get('http://localhost:5002/address/all');
        const addresses = addressRes.data.addresses;

        const combinedData = mergeData(orders, accounts, addresses);

        res.status(200).json({
            success: true,
            message: 'Get all orders',
            orders: combinedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnUnprocessedOrders = async (req,res) => {
    try {
        const orders = await getUnprocessedOrders();

        const accountRes = await axios.get('http://localhost:5002/account/all');
        const accounts = accountRes.data.accounts;

        const addressRes = await axios.get('http://localhost:5002/address/all');
        const addresses = addressRes.data.addresses;

        const combinedData = mergeData(orders, accounts, addresses);

        res.status(200).json({
            success: true,
            message: 'Get all unprocessed orders',
            orders: combinedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



export const returnOrderDetailsByOrderId = async (req,res) => {
    try {
        const { order_id } = req.params;

        const details = await getOrderDetailsByOrderId(order_id); // should return an array

        const combinedData = await Promise.all(
            details.map(async (item) => {
                try {
                    const response = await axios.get(`http://localhost:5000/manage/product/find-type/${item.item_type}/${item.item_ref_id}`);

                    return {
                        ...item,
                        name: '',
                        product: response.data.component, // assuming the response is { success, component }
                    };
                } catch (err) {
                    console.error(`Failed to fetch ${item.item_type} with id ${item.item_ref_id}`);
                    return {
                        ...item,
                        product: null,
                        error: `Could not fetch product data`,
                    };
                }
            })
        );

        res.status(200).json({
            success: true,
            message: 'Order details with product info',
            order_id,
            details: combinedData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}