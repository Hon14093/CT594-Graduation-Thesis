import express from 'express';
import { 
    returnAllProducts,
    returnAllBrands,
    returnAllCategories,
    createNewBrand,
    createNewCategory,
    createNewProduct,
    editProduct,
    removeProduct,
} from './controllers/productController.js';
import { returnAllLaptops } from './controllers/componentController.js';

const router = express.Router();

router.get('/all', returnAllProducts);
router.post('/create', createNewProduct);
router.put('/update/:product_id', editProduct);
router.delete('/delete/:product_id', removeProduct);

router.get('/brands/all', returnAllBrands);
router.post('/brands/create', createNewBrand);

router.get('/categories/all', returnAllCategories);
router.post('/categories/create', createNewCategory);

router.get('/laptops/all', returnAllLaptops);

export default router;