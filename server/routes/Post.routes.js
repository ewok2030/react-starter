import { Router } from 'express';
import * as postController from '../controllers/Post.controller';

const router = new Router();

// Get All
router.route('/').get(postController.getPosts);

// Get
router.route('/:id').get(postController.getPost);

// Create
router.route('/').post(postController.addPost);

// Update
router.route('/:id').put(postController.updatePost);

// Delete
router.route('/:id').delete(postController.deletePost);

export default router;
