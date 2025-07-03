import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compatibilityRoutes from './route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/tool/', compatibilityRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});