import { getAccountInfo, getAllAccounts } from "../model/Account.js";

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