import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { 
    getAllLaptops, 
    getAllProductVariations,
    createLaptop, updateLaptop, deleteLaptop,
    getLaptopVariations
} from "../model/Laptop.js"
import { getAllAdapters, createAdapter, updateAdapter, deleteAdapter, getAdapterVariations } from "../model/Adatper.js";
import { getAllCables, createCable, updateCable, deleteCable, getCableVariations } from "../model/Cable.js";
import { getAllDocks,createDock, updateDock, deleteDock, getDockVariations } from "../model/Dock.js";
import { getAllMonitors, createMonitor, updateMonitor, deleteMonitor, getMonitorVariations } from "../model/Monitor.js";
import { getAllRams, createRam, updateRam, deleteRam, getRamVariations } from "../model/Ram.js";
import { getAllStorages, createStorage, updateStorage, deleteStorage, getStorageVariations } from "../model/Storage.js";

export const getComponentNameAndId = async (req, res) => {
    const { id, type } = req.params;

    if (!id || !type) {
        return res.status(400).json({ message: 'Component ID and Type are required.' });
    }

    let component = null;
    const includeObject = {
        product: {
            select: {
                product_name: true,
                image_url: true,
                brand: true
            }
        }
    }

    try {
        switch (type) {
            case 'laptop':
                component = await prisma.laptop.findUnique({ 
                    where: { laptop_id: id }, 
                    include: includeObject
                });
                break;
            case 'ram':
                component = await prisma.ram.findUnique({ 
                    where: { ram_id: id }, 
                    include: includeObject
                });
                break;
            case 'cable':
                component = await prisma.cable.findUnique({ 
                    where: { cable_id: id }, 
                    include: includeObject
                });
                break;
            case 'storage':
                component = await prisma.storage.findUnique({ 
                    where: { storage_id: id }, 
                    include: includeObject
                });
                break;
            case 'monitor':
                component = await prisma.monitor.findUnique({ 
                    where: { monitor_id: id }, 
                    include: includeObject
                });
                break;
            case 'dock':
                component = await prisma.dock.findUnique({ 
                    where: { dock_id: id }, 
                    include: includeObject
                });
                break;
            case 'adapter':
                component = await prisma.adapter.findUnique({ 
                    where: { adapter_id: id }, 
                    include: includeObject
                });
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

export const returnVariations = async (req,res) => {
    const { type, id } = req.params;

    let components = null;
    const includeObject = {
        product: {
            select: {
                product_name: true,
                image_url: true,
                brand: true
            }
        }
    }

    try {
        switch (type) {
            case 'laptop':
                components = await getLaptopVariations(id)
                break;
            case 'ram':
                components = await getRamVariations(id)
                break;
            case 'cable':
                components = await getCableVariations(id)
                break;
            case 'storage':
                components = await getStorageVariations(id)
                break;
            case 'monitor':
                components = await getMonitorVariations(id)
                break;
            case 'dock':
                components = await getDockVariations(id)
                break;
            case 'adapter':
                components = await getAdapterVariations(id)
                break;
            default:
                return res.status(404).json({ message: 'Invalid component type.' });
        }

        if (!components) {
            return res.status(404).json({ message: 'Components not found.' });
        }

        console.log(components)

        res.status(200).json({ success: true, variations: components });
    } catch (error) {
        console.error(`Error fetching component ${type} with ID ${id}:`, error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }

}

// Laptop ----------------------------------------------------------
export const returnAllLaptops = async (req,res) => {
    try {
        const laptops = await getAllLaptops();

        const formattedData = laptops.map(laptop => {
            const laptop_name = `${laptop.product.product_name} ${laptop.cpu} ${laptop.gpu}`;

            return {
                ...laptop,
                laptop_name: laptop_name,
                image_url: laptop.product.image_url,
                brand: laptop.product.brand.brand_name,
                laptop_price: laptop.price.toLocaleString() + " vnđ"
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

export const createLaptopController = async (req, res) => {
    try {
        const laptop = await createLaptop(req.body);
        res.status(201).json({ success: true, laptop });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateLaptopController = async (req, res) => {
    try {
        const { id } = req.params;
        const laptop = await updateLaptop(id, req.body);
        res.status(200).json({ success: true, laptop });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteLaptopController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteLaptop(id);
        res.status(200).json({ success: true, message: "Laptop deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const formatData = (item) => {
    const name = Object.keys(item).find(
        key => key.endsWith('_name')
    ) || null;

    const model = Object.keys(item).find(
        key => key.endsWith('_model')
    ) || null;

    return {
        ...item,
        name: item[name],
        model: item[model],
        brand: item.product.brand.brand_name,
        image_url: item.product.image_url
    }
}

// RAM ----------------------------------------------------------
export const returnAllRams = async (req,res) => {
    try {
        const rams = await getAllRams();
        const formattedData = rams.map(item => formatData(item));
        res.status(200).json({
            success: true,
            message: 'Get all rams',
            rams: formattedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createRamController = async (req, res) => {
    try {
        const ram = await createRam(req.body);
        res.status(201).json({ success: true, ram });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateRamController = async (req, res) => {
    try {
        const { id } = req.params;
        const ram = await updateRam(id, req.body);
        res.status(200).json({ success: true, ram });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteRamController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteRam(id);
        res.status(200).json({ success: true, message: "RAM deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Monitor ---------------------------------------------------
export const returnAllMonitors = async (req,res) => {
    try {
        const monitors = await getAllMonitors();
        const formattedData = monitors.map(item => formatData(item));
        res.status(200).json({
            success: true,
            message: 'Get all monitors',
            monitors: formattedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createMonitorController = async (req, res) => {
    try {
        const monitor = await createMonitor(req.body);
        res.status(201).json({ success: true, monitor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateMonitorController = async (req, res) => {
    try {
        const { id } = req.params;
        const monitor = await updateMonitor(id, req.body);
        res.status(200).json({ success: true, monitor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteMonitorController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteMonitor(id);
        res.status(200).json({ success: true, message: "Monitor deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Dock ----------------------------------------------------------
export const returnAllDocks = async (req,res) => {
    try {
        const docks = await getAllDocks();
        const formattedData = docks.map(item => formatData(item));
        res.status(200).json({
            success: true,
            message: 'Get all docks',
            docks: formattedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createDockController = async (req, res) => {
    try {
        console.log(req.body)
        const dock = await createDock(req.body);
        res.status(201).json({ success: true, dock });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateDockController = async (req, res) => {
    try {
        const { id } = req.params;
        const dock = await updateDock(id, req.body);
        res.status(200).json({ success: true, dock });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteDockController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteDock(id);
        res.status(200).json({ success: true, message: "Dock deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Storage ------------------------------------------------------
export const returnAllStorages = async (req,res) => {
    try {
        const storages = await getAllStorages();
        const formattedData = storages.map(item => formatData(item));
        res.status(200).json({
            success: true,
            message: 'Get all storages',
            storages: formattedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createStorageController = async (req, res) => {
    try {
        const storage = await createStorage(req.body);
        res.status(201).json({ success: true, storage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateStorageController = async (req, res) => {
    try {
        const { id } = req.params;
        const storage = await updateStorage(id, req.body);
        res.status(200).json({ success: true, storage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteStorageController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteStorage(id);
        res.status(200).json({ success: true, message: "Storage deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Cable ---------------------------------------------------
export const returnAllCables = async (req,res) => {
    try {
        const cables = await getAllCables();
        const formattedData = cables.map(item => formatData(item));
        res.status(200).json({
            success: true,
            message: 'Get all cables',
            cables: formattedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createCableController = async (req, res) => {
    try {
        const cable = await createCable(req.body);
        res.status(201).json({ success: true, cable });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateCableController = async (req, res) => {
    try {
        const { id } = req.params;
        const cable = await updateCable(id, req.body);
        res.status(200).json({ success: true, cable });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteCableController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCable(id);
        res.status(200).json({ success: true, message: "Cable deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Adapter ------------------------------------------------------
export const returnAllAdapters = async (req,res) => {
    try {
        const adapters = await getAllAdapters();
        const formattedData = adapters.map(item => formatData(item));
        res.status(200).json({
            success: true,
            message: 'Get all cables',
            adapters: formattedData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createAdapterController = async (req, res) => {
    try {
        const adapter = await createAdapter(req.body);
        res.status(201).json({ success: true, adapter });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateAdapterController = async (req, res) => {
    try {
        const { id } = req.params;
        const adapter = await updateAdapter(id, req.body);
        res.status(200).json({ success: true, adapter });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteAdapterController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteAdapter(id);
        res.status(200).json({ success: true, message: "Adapter deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};