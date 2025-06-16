import express from 'express';
import { 
    returnAllProducts,
    returnAllBrands,
    returnAllCategories,
    createNewBrand,
    createNewCategory,
} from './controllers.js';

const router = express.Router();

router.get('/all', returnAllProducts);

router.get('/brands/all', returnAllBrands);
router.post('/brands/create', createNewBrand);

router.get('/categories/all', returnAllCategories);
router.post('/categories/create', createNewCategory);

export default router;