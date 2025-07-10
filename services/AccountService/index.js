import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoutes.js'
import addressRoute from './routes/addressRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/address', addressRoute);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});