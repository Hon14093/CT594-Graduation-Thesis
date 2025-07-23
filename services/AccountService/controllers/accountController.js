import { getAccountInfo, getAllAccounts, getCustomerCount, removeAccount, updateAccountStatus } from "../model/Account.js";

export const returnAllAccounts = async (req,res) => {
    try {
        
        const accounts = await getAllAccounts();
        res.status(200).json({
            success: true,
            message: 'Get accounts',
            accounts: accounts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnAccountInfo = async (req,res) => {
    try {
        const { account_id } = req.params;
        const info = await getAccountInfo(account_id);
        res.status(200).json({
            success: true,
            message: 'Get account info',
            account: info
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnCustomerCount = async (req,res) => {
    try {
        const count = await getCustomerCount();
        res.status(200).json({
            success: true,
            message: 'Get customer count',
            count: count
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const editAccountStatus = async (req,res) => {
    try {
        const { account_id } = req.params;
        console.log(req.body)
        const { new_status } = req.body;
        
        const updatedStatus = await updateAccountStatus(account_id, new_status);

        res.status(200).json({
            success: true,
            account: updatedStatus
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteAccount = async (req,res) => {
    try {
        const { account_id } = req.params;
        await removeAccount(account_id);

        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}