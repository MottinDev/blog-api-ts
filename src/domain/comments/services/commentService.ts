import { openDatabase } from '../../../db/database';
import { v4 as uuidv4 } from 'uuid';

export const commentService = {
    // Função para adicionar um comentário a um post
    async addComment(postId: string, content: string) {
        const commentId = uuidv4();
        const db = await openDatabase();
        const post = await db.get('SELECT * FROM posts WHERE id = ?', postId);
        if (!post) throw new Error('Post não encontrado');

        await db.run('INSERT INTO comments (id, postId, content, likes) VALUES (?, ?, ?, ?)', [commentId, postId, content, 0]); // Inicializa os likes com 0
        return { commentId, postId, content };
    },

    // Função para obter todos os comentários de um post
    async getCommentsByPostId(postId: string) {
        const db = await openDatabase();
        return db.all('SELECT * FROM comments WHERE postId = ?', postId);
    },

    // Função para incrementar o número de likes de um comentário
    async likeComment(id: string): Promise<void> {
        const db = await openDatabase();

        // Atualizando a tabela de comentários, incrementando o número de likes
        await db.run('UPDATE comments SET likes = likes + 1 WHERE id = ?', [id]);
    },

    // Função para retornar o número de likes de um comentário
    async getCommentLikes(id: string): Promise<number> {
        const db = await openDatabase();

        // Recuperando o número de likes do comentário específico
        const result = await db.get('SELECT likes FROM comments WHERE id = ?', [id]);

        // Retornando o número de likes ou 0 se o comentário não for encontrado
        return result?.likes || 0;
    }
};
