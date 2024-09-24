import { Request, Response } from 'express';
import { commentService } from '../services/commentService';

export const commentController = {
    async addComment(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;
        try {
            const newComment = await commentService.addComment(id, content);
            res.status(201).json(newComment);
        } catch (error) {
            res.status(404).json({ error: error });
        }
    },

    async getCommentsByPostId(req: Request, res: Response) {
        const { id } = req.params;
        const comments = await commentService.getCommentsByPostId(id);
        res.json(comments);
    },

    async likeCommentById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            // Adiciona um like ao comentário
            await commentService.likeComment(id);

            // Obtém o número atualizado de likes
            const likes = await commentService.getCommentLikes(id);

            // Retorna o número de likes como resposta
            res.status(200).json({ likes });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar like ao comentário' });
        }
    },

    async getCommentLikesById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            // Obtém o número de likes do comentário
            const likes = await commentService.getCommentLikes(id);

            // Retorna o número de likes como resposta
            res.status(200).json({ likes });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter número de likes do comentário' });
        }
    }
};
