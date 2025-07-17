import { createOrderWithDetails } from './orderController.js';
import stripe from '../config/stripe.js';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const createCheckoutSession = async (req,res) => {
    try {
        const { items, account_id, address_id, order_total, note, pm_id, sm_id, discount_id } = req.body;

        const order = await createOrderWithDetails({
            account_id,
            address_id,
            items,
            order_total,
            note,
            pm_id,
            sm_id,
            discount_id,
        });

        const line_items = items.map(item => ({
            price_data: {
                currency: 'vnd',
                product_data: {
                name: item.item_name,
                },
                unit_amount: Math.round(item.price),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: `http://localhost:5173/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/checkout-cancel`,
            metadata: {
                order_id: order.order_id,
                account_id,
            },
        });

        return res.json({ id: session.id });

    } catch (error) {
        console.error("Error creating checkout session:", error);
        return res.status(500).json({ message: "Failed to create checkout session" });
    }
}

// controllers/paymentController.js
export const getSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        console.log(session);
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: "Cannot retrieve Stripe session" });
    }
};

