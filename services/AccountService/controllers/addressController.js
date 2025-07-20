import { createAddress, getAddressById, getAddressesByAccountId, getAllAddresses, removeAddress, updateAddress } from "../model/Address.js";

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

export const returnAllAddresses = async (req,res) => {
    try {
        const addresses = await getAllAddresses();
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

export const returnAddressById = async (req,res) => {
    try {
        const { address_id } = req.params;
        const address = await getAddressById(address_id);
        res.status(200).json({
            success: true,
            message: 'Found address!',
            address: address
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

export const editAddress = async (req,res) => {
    try {
        const { address_id } = req.params;
        const data = req.body;
        console.log(data)
        const updatedAddress = await updateAddress(address_id, data);
        res.status(201).json({
            success: 1,
            updatedAddress
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}

export const deleteAddress = async (req,res) => {
    try {
        const { address_id } = req.params;
        const deletedAddress = await removeAddress(address_id);
        res.status(201).json({
            success: 1,
            deletedAddress
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}