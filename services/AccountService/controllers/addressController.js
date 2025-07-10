import { createAddress, getAddressesByAccountId } from "../model/Address.js";

export const returnAddressesByAccountId = async (req,res) => {
    try {
        const { account_id } = req.params;
        const addresses = await getAddressesByAccountId(account_id);
        res.status(200).json({
            success: true,
            message: 'Get all addresses',
            addresses: addresses
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createNewAddress = async (req,res) => {
    try {
        const data = req.body;
        const newAddress = await createAddress(data);

        res.status(201).json({
            success: true,
            message: 'Address created successfully',
            address: newAddress
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}