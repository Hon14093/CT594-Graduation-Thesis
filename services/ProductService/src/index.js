import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/manage/products', productRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});