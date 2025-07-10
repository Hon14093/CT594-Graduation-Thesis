import { getAllLaptops, getAllProductVariations } from "../model/Laptop.js"
import { getAllMonitors } from "../model/Monitor.js";
import { getAllRams } from "../model/Ram.js";

export const getComponentNameAndId = async (req, res) => {
  const { id, type } = req.params; // Or req.query if you prefer

    if (!id || !type) {
        return res.status(400).json({ message: 'Component ID and Type are required.' });
    }

    let component = null;
    try {
        switch (type) {
        case 'CPU':
            component = await productPrisma.cpu.findUnique({ where: { id }, select: { name: true, id: true } });
            break;
        case 'GPU':
            component = await productPrisma.gpu.findUnique({ where: { id }, select: { name: true, id: true } });
            break;
        case 'RAM':
            component = await productPrisma.ram.findUnique({ where: { id }, select: { name: true, id: true } });
            break;
        case 'Storage':
            component = await productPrisma.storage.findUnique({ where: { id }, select: { name: true, id: true } });
            break;
        case 'Screen':
            component = await productPrisma.screen.findUnique({ where: { id }, select: { name: true, id: true } });
            break;
        case 'Keyboard':
            component = await productPrisma.keyboard.findUnique({ where: { id }, select: { name: true, id: true } });
            break;
        case 'Chassis':
            component = await productPrisma.chassis.findUnique({ where: { id }, select: { name: true, id: true } });
            break;
        default:
            return res.status(404).json({ message: 'Invalid component type.' });
        }

        if (!component) {
        return res.status(404).json({ message: 'Component not found.' });
        }

        res.status(200).json({ success: true, component });
    } catch (error) {
        console.error(`Error fetching component ${type} with ID ${id}:`, error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

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

export const returnAllLaptopVariations = async (req,res) => {
    try {
        const { product_id } = req.params;
        const allVariations = await getAllProductVariations(product_id);

        const formattedData = allVariations.map(laptop => {
            const laptop_name = `${laptop.product.product_name} ${laptop.cpu} ${laptop.gpu}`;

            return {
                ...laptop,
                laptop_name: laptop_name
            }
        });

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

export const returnAllRams = async (req,res) => {
    try {
        const rams = await getAllRams();
        res.status(200).json({
            success: true,
            message: 'Get all rams',
            rams: rams
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnAllMonitors = async (req,res) => {
    try {
        const monitors = await getAllMonitors();
        res.status(200).json({
            success: true,
            message: 'Get all rams',
            monitors: monitors
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}