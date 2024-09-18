import express from 'express';
import { createTables } from './db/database';
import postRoutes from './domain/posts/routes/post';
import commentRoutes from './domain/comments/routes/comments';

const app = express();
const port = 3000;

// Middleware para tratar JSON
app.use(express.json());

// Iniciar o banco de dados e criar tabelas
createTables();

// Rotas
app.use('/posts', postRoutes);
app.use('/posts/:id/comments', commentRoutes);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
