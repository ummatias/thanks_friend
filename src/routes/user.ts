import express from 'express';
import UserController from '../controllers/user';

const userController = new UserController();
const router = express.Router();

router.get('/users/', userController.getUsers);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id', userController.getUser);

export default router;
