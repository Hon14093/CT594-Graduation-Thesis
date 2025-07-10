import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import paymentRoutes from './src/routes/paymentRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use('/payment', paymentRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});