import { createDiscount, deleteDiscount, getDiscountByCode, getDiscounts } from "../models/Discount.js"

export const returnAllDiscounts = async (req,res) => {
    try {
        const discounts = await getDiscounts();
        res.status(200).json({
            success: true,
            message: 'Get all discounts',
            discounts: discounts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const addDiscount = async (req,res) => {
    try {
        const data = req.body;
        const newDiscount = await createDiscount(data);
        
        res.status(201).json({
            success: true,
            message: 'Created discount',
            discount: newDiscount
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const editDiscount = async (req,res) => {
    try {
        const { discount_id } = req.params;
        const data = req.body;
        const updatedDiscount = await updateDiscount(discount_id, data);

        res.status(200).json({
            success: 1,
            updatedDiscount
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const removeDiscount = async (req,res) => {
    try {
        const { discount_id } = req.params;
        const deleted = await deleteDiscount(discount_id);

        res.status(200).json({
            success: 1,
            deleted
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const findDiscountByCode = async (req,res) => {
    try {
        const { discount_code } = req.params;
        const discount = await getDiscountByCode(discount_code);

        res.status(200).json({
            success: 1,
            discount
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: 0,
            message: 'Internal Server Error'
        });
    }
}