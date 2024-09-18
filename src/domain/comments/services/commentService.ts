import { openDatabase } from '../../../db/database';
import { v4 as uuidv4 } from 'uuid';

export const commentService = {
    async addComment(postId: string, content: string) {
        const commentId = uuidv4();
        const db = await openDatabase();
        const post = await db.get('SELECT * FROM posts WHERE id = ?', postId);
        if (!post) throw new Error('Post not found');

        await db.run('INSERT INTO comments (id, postId, content) VALUES (?, ?, ?)', [commentId, postId, content]);
        return { commentId, postId, content };
    },

    async getCommentsByPostId(postId: string) {
        const db = await openDatabase();
        return db.all('SELECT * FROM comments WHERE postId = ?', postId);
    }
};
