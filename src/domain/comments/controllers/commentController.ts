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
            res.status(404).json({ error: error});
        }
    },

    async getCommentsByPostId(req: Request, res: Response) {
        const { id } = req.params;
        const comments = await commentService.getCommentsByPostId(id);
        res.json(comments);
    }
};
