import express from 'express';
import UserController from '../controllers/user';

const userController = new UserController();
const router = express.Router();

router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:email', userController.getUserByEmail);

export default router;
