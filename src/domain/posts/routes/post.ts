import { Router } from 'express';
import { postController } from '../controllers/postController';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);

export default router;
