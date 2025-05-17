const express = require('express');
const path = require('path')
const app = express();
const tarefasRoutes = require('./routes/tarefas.js');
const authRoutes = require('./routes/auth.js');
const database = require('./config/index.js');
const fs = require('fs');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tarefas', tarefasRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Middleware para tratar rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ mensagem: 'Endpoint não encontrado' });
});

// Middleware para tratar erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    mensagem: 'Erro interno do servidor',
    erro: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

const PORT = process.env.PORT || 8080;

// Sincronizar banco de dados antes de iniciar o servidor
database.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar banco de dados:', err);
});
