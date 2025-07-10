import { createOrder } from "../models/Order.js";
import { PrismaClient } from "@prisma/client";
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
                })),
            },
        },
        include: {
            order_details: true,
        },
    });
};

// export const get
