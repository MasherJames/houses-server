import { Router } from 'express';
import PropertyController from '../controller/Property';
import PropertyMiddleware from '../middlewares/property';

const router = Router();

router.post('/', PropertyMiddleware.propertyInputsValidator, PropertyController.create);
router.get('/', PropertyController.listAll);
router.get('/:propertyId', PropertyController.getOne);
router.put('/:propertyId/update', PropertyController.update);
router.delete('/:propertyId/delete', PropertyController.delete);

export default router;