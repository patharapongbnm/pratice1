import { Router } from 'express';
import * as controller from '../controllers/product.controller.js';
import { validateProduct } from '../middlewares/validate.middleware.js';

const router = Router();

router.get('/',      controller.getAll);
router.get('/:id',   controller.getById);
router.post('/',     validateProduct, controller.create);
router.put('/:id',   validateProduct, controller.update);
router.delete('/:id', controller.remove);

export default router;