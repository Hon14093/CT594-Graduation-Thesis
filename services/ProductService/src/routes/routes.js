import express from 'express';
import { 
    returnAllProducts, returnAllBrands, returnAllCategories, createNewBrand,
    createNewCategory, createNewProduct, editProduct, removeProduct,
    returnAllProductByCategory,
    returnPopularProducts,
    editBrand,
    removeBrand,
    editCategory,
    removeCategory,
    searchProduct,
} from '../controllers/productController.js';
import { 
    returnAllLaptops, 
    returnAllLaptopVariations, 
    returnAllRams, 
    returnAllMonitors,
    returnAllDocks,
    returnAllStorages,
    returnAllCables,
    returnAllAdapters,
    createLaptopController, updateLaptopController, deleteLaptopController,
    createRamController, updateRamController, deleteRamController,
    createStorageController, updateStorageController, deleteStorageController,
    createCableController, updateCableController, deleteCableController,
    createMonitorController, updateMonitorController, deleteMonitorController,
    createAdapterController, updateAdapterController, deleteAdapterController,
    createDockController, updateDockController, deleteDockController,
    getComponentNameAndId,
    returnVariations
} from '../controllers/componentController.js';
import { returnReviewsByProductId } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/all', returnAllProducts);
router.get('/category-id/:category_id', returnAllProductByCategory);
router.post('/create', createNewProduct);
router.put('/update/:product_id', editProduct);
router.delete('/delete/:product_id', removeProduct);

router.get('/brands/all', returnAllBrands);
router.post('/brands/create', createNewBrand);
router.put('/brands/update/:brand_id', editBrand);
router.delete('/brands/delete/:brand_id', removeBrand);

router.get('/categories/all', returnAllCategories);
router.post('/categories/create', createNewCategory);
router.put('/categories/update/:category_id', editCategory);
router.delete('/categories/delete/:category_id', removeCategory);

router.get('/laptops/all', returnAllLaptops);
router.get('/laptops/variations/:product_id', returnAllLaptopVariations);
router.post('/laptops/create', createLaptopController);
router.put('/laptops/update/:id', updateLaptopController);
router.delete('/laptops/delete/:id', deleteLaptopController);

router.get('/rams/all', returnAllRams);
router.post('/rams/create', createRamController);
router.put('/rams/update/:id', updateRamController);
router.delete('/rams/delete/:id', deleteRamController);

router.get('/monitors/all', returnAllMonitors);
router.post('/monitors/create', createMonitorController);
router.put('/monitors/update/:id', updateMonitorController);
router.delete('/monitors/delete/:id', deleteMonitorController);

router.get('/docks/all', returnAllDocks);
router.post('/docks/create', createDockController);
router.put('/docks/update/:id', updateDockController);
router.delete('/docks/delete/:id', deleteDockController);

router.get('/storages/all', returnAllStorages);
router.post('/storages/create', createStorageController);
router.put('/storages/update/:id', updateStorageController);
router.delete('/storages/delete/:id', deleteStorageController);

router.get('/cables/all', returnAllCables);
router.post('/cables/create', createCableController);
router.put('/cables/update/:id', updateCableController);
router.delete('/cables/delete/:id', deleteCableController);

router.get('/adapters/all', returnAllAdapters);
router.post('/adapters/create', createAdapterController);
router.put('/adapters/update/:id', updateAdapterController);
router.delete('/adapters/delete/:id', deleteAdapterController);

router.get('/find-type/:type/:id', getComponentNameAndId);
router.get('/variations/:type/:id', returnVariations);
router.get('/popular', returnPopularProducts);

router.get('/search', searchProduct);

export default router;