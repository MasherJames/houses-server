import { Router } from 'express';
import UserController from '../controller/User';
import UserMiddleware from '../middlewares/user';

const router = Router();

router.post('/register', UserMiddleware.registerInputsValidator, UserMiddleware.uniqueUser, UserController.register);
router.post('/login', UserMiddleware.loginInputValidator, UserController.login);

export default router;