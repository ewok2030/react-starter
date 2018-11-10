import { Router } from 'express';
import * as userController from '../controllers/User.controller';

const router = new Router();

// Get All
router.route('/').get(userController.getUsers);

// Get
router.route('/:id').get(userController.getUser);

// Create
router.route('/').post(userController.addUser);

// Update
router.route('/:id').put(userController.updateUser);

// Delete
router.route('/:id').delete(userController.deleteUser);

export default router;
