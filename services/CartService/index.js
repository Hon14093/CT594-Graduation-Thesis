import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cartRoutes from './route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Cart service running on port ${PORT}`);
});
