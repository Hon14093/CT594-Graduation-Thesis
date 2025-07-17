import { getAllAccounts } from "../model/Account.js";

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