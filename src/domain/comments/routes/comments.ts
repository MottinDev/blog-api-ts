import { Router } from 'express';
import { commentController } from '../controllers/commentController';

const router = Router();

router.post('/:id', commentController.addComment);
router.get('/:id', commentController.getCommentsByPostId);
router.post('/:id/like', commentController.likeCommentById);
router.get('/:id/likes', commentController.getCommentLikesById);


export default router;
