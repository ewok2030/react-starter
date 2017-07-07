import { Router } from 'express';
import * as taskController from '../controllers/Task.controller';

const router = new Router();

// Get All
router.route('/').get(taskController.getTasks);

// Get
router.route('/:id').get(taskController.getTask);

// Create
router.route('/').post(taskController.addTask);

// Update
router.route('/:id').put(taskController.updateTask);

// Delete
router.route('/:id').delete(taskController.deleteTask);

export default router;
