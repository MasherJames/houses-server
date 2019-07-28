import { Router } from 'express';
import userRouter from './user';
import propertyRouter from './property';

const router = Router();

router.use('/auth', userRouter);
router.use('/property', propertyRouter);

export default router;