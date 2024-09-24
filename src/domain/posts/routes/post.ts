import { Router } from 'express';
import { postController } from '../controllers/postController';
const { likePostById, getPostLikesById } = postController;

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
// Rota para adicionar um like a uma postagem
router.post('/:id/like', likePostById);
// Rota para obter o número de likes de uma postagem
router.get('/:id/likes', getPostLikesById);

export default router;
