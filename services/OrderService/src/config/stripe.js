import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: '2025-06-30.basil'
})

export default stripe;