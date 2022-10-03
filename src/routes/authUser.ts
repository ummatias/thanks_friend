import express from 'express';
import UserController from '../controllers/user';

const userController = new UserController();

const router = express.Router();

router.post('/user', userController.createUser);
router.post('/login', userController.login);
router.post('/me', userController.me);

export default router;
