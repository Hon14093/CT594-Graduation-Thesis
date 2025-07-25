import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createAccount, findAccountByEmail } from "../model/Account.js";

dotenv.config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

export const login = async (req,res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const account = await findAccountByEmail(email);
        if (!account) {
            console.log('Không tìm thấy')
            return res.status(404).json({ message: "Không tìm thấy tài khoản." });
        }

        if (!account.is_active) {
            console.log('Vô hiệu hóa')
            return res.status(401).json({ message: "Tài khoản đã bị vô hiệu hóa!" })
        }

        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            console.log('Sai mật khẩu')
            return res.status(401).json({ message: "Sai mật khẩu!" });
        }

        const token = jwt.sign(
            {
                account_id: account.account_id,
                role: account.role_id
            },
            jwtSecret,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            status: 1,
            message: "Login successful",
            token,
            user: {
                account_id: account.account_id,
                role: account.role.role_id
            }
        });
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        console.log("Dữ liệu yêu cầu:", req.body);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

export const register = async (req,res) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingAccount = await findAccountByEmail(email);
        if (existingAccount) {
            return res.status(400).json({ message: "Email đã được sử dụng bởi tài khoản khác." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;

        const newAccount = await createAccount(req.body);
        console.log(newAccount);

        const token = jwt.sign(
            {
                account_id: newAccount.account_id,
                role: 'Thành viên'
            },
            jwtSecret,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            status: 1,
            message: "Account created successfully!",
            token
        });
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        console.log("Dữ liệu yêu cầu:", req.body);
        return res.status(500).json({ message: "Internal server error!" });
    }
}