import { openDatabase } from '../../../db/database';
import { v4 as uuidv4 } from 'uuid';

export const postService = {
    // Função para retornar todos os posts
    async getAllPosts() {
        const db = await openDatabase();
        return db.all('SELECT * FROM posts');
    },

    // Função para retornar um post pelo ID
    async getPostById(id: string) {
        const db = await openDatabase();
        return db.get('SELECT * FROM posts WHERE id = ?', id);
    },

    // Função para criar um novo post
    async createPost(title: string, content: string) {
        const id = uuidv4();
        const db = await openDatabase();
        await db.run('INSERT INTO posts (id, title, content, likes) VALUES (?, ?, ?, ?)', [id, title, content, 0]); // Inicializa os likes com 0
        return { id, title, content };
    },

    // Função para incrementar o número de likes de um post
    async likePost(id: string): Promise<void> {
        const db = await openDatabase();
        await db.run('UPDATE posts SET likes = likes + 1 WHERE id = ?', [id]);
    },

    // Função para retornar o número de likes de um post
    async getPostLikes(id: string): Promise<number> {
        const db = await openDatabase();
        const result = await db.get('SELECT likes FROM posts WHERE id = ?', [id]);
        return result?.likes || 0; // Retorna 0 se não encontrar o post ou não houver likes
    }
};
