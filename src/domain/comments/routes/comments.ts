import { Router } from 'express';
import { commentController } from '../controllers/commentController';

const router = Router();

router.post('/:id', commentController.addComment);
router.get('/:id', commentController.getCommentsByPostId);

export default router;
