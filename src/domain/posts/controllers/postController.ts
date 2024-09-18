import { Request, Response } from 'express';
import { postService } from '../services/postServices';

export const postController = {
    async getAllPosts(req: Request, res: Response) {
        const posts = await postService.getAllPosts();
        res.json(posts);
    },

    async getPostById(req: Request, res: Response) {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    },

    async createPost(req: Request, res: Response) {
        const { title, content } = req.body;
        const newPost = await postService.createPost(title, content);
        res.status(201).json(newPost);
    }
};
