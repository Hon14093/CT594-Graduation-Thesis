import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './src/routes/routes.js'
import imageUpload from './src/imageUpload.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/manage/product', productRoutes);
app.use('/image/', imageUpload);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});