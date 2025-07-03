import { getAllLaptops } from "../model/Laptop.js"

export const returnAllLaptops = async (req,res) => {
    try {
        const laptops = await getAllLaptops();

        const formattedData = laptops.map(laptop => {
            const laptop_name = `${laptop.product.product_name} ${laptop.cpu} ${laptop.gpu}`;

            return {
                ...laptop,
                laptop_name: laptop_name
            }
        })

        res.status(200).json({
            success: true,
            message: 'Get all products',
            laptops: formattedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}