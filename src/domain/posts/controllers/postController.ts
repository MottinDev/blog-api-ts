import { Request, Response } from 'express';
import { postService } from '../services/postServices';

export const postController = {
    // Retorna todos os posts
    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await postService.getAllPosts();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter posts' });
        }
    },

    // Retorna um post pelo ID
    async getPostById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const post = await postService.getPostById(id);
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ error: 'Post não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter post' });
        }
    },

    // Cria um novo post
    async createPost(req: Request, res: Response) {
        const { title, content } = req.body;
        try {
            const newPost = await postService.createPost(title, content);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar post' });
        }
    },

    // Adiciona um like a um post pelo ID
    async likePostById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            // Chama a função do serviço para adicionar um like à postagem
            await postService.likePost(id);

            // Após adicionar o like, chama a função do serviço para obter o número atualizado de likes
            const updatedLikes = await postService.getPostLikes(id);

            // Retorna o número de likes como resposta em formato JSON
            res.json({ likes: updatedLikes });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar like na postagem' });
        }
    },

    // Obtém o número de likes de um post pelo ID
    async getPostLikesById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            // Chama a função do serviço para obter o número de likes da postagem
            const likes = await postService.getPostLikes(id);

            // Retorna o número de likes como resposta em formato JSON
            res.json({ likes });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter o número de likes da postagem' });
        }
    }
};
