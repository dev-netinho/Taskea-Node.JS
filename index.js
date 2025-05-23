const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// Configuração para ambiente serverless
const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';

// Configuração de rotas e middleware básicos que não dependem do banco
app.use(express.json());

// Configuração explícita para servir arquivos estáticos com diagnóstico
app.use((req, res, next) => {
  if (req.url.match(/\.(css|jpg|jpeg|png|gif|js|ico)$/)) {
    console.log(`[DEBUG] Requisição de arquivo estático: ${req.url}`);
  }
  next();
});

// Configuração explícita para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 0,
  etag: false,
  lastModified: false,
  index: false
}));

// Middleware para controle de cache de arquivos estáticos
app.use((req, res, next) => {
  if (req.url.match(/\.(css|jpg|jpeg|png|gif|js|ico)$/)) {
    // Definir cabeçalhos para evitar problemas de cache
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

// Rota raiz que não depende do banco de dados
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rotas estáticas explícitas para garantir acesso direto
app.get('/login.html', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register.html', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/home.html', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/new_task.html', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'new_task.html'));
});

// Rota de diagnóstico para verificar arquivos CSS
app.get('/debug/css-check', (req, res) => {
  const cssFiles = [
    '/styles/home/style.css',
    '/styles/login/style.css',
    '/styles/register/style.css',
    '/styles/new_task/style.css'
  ];
  
  const results = {};
  
  cssFiles.forEach(file => {
    const fullPath = path.join(__dirname, 'public', file);
    results[file] = {
      exists: fs.existsSync(fullPath),
      size: fs.existsSync(fullPath) ? fs.statSync(fullPath).size : 0
    };
  });
  
  res.json({
    publicDir: fs.existsSync(path.join(__dirname, 'public')),
    stylesDir: fs.existsSync(path.join(__dirname, 'public', 'styles')),
    cssFiles: results
  });
});

// Inicialização segura do banco de dados
let database;
try {
  database = require('./config/index.js');
  
  // Rotas que dependem do banco de dados
  const tarefasRoutes = require('./routes/tarefas.js');
  const authRoutes = require('./routes/auth.js');
  
  app.use('/auth', authRoutes);
  app.use('/tarefas', tarefasRoutes);
  
  // Tenta sincronizar o banco apenas se não estiver no Vercel
  if (!isVercel) {
    database.sync({ force: false }).then(() => {
      console.log('Banco de dados sincronizado localmente');
    }).catch(err => {
      console.error('Erro ao sincronizar banco de dados localmente:', err);
    });
  }
} catch (err) {
  console.error('Erro ao inicializar banco de dados:', err);
}

// Middleware para tratar rotas não encontradas
app.use((req, res, next) => {
  if (req.path.includes('.') && !req.path.endsWith('.html')) {
    console.log(`[DEBUG] Arquivo não encontrado: ${req.path}`);
    // Para arquivos estáticos não encontrados, retorna 404 normal
    return next();
  }
  // Para APIs e páginas, retorna JSON
  res.status(404).json({ mensagem: 'Endpoint não encontrado' });
});

// Middleware para tratar erros
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  
  // Se for um arquivo estático, continua para o próximo handler
  if (req.path.includes('.') && !req.path.endsWith('.html')) {
    return next(err);
  }
  
  // Para APIs e páginas, retorna JSON
  res.status(500).json({ 
    mensagem: 'Erro interno do servidor',
    erro: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Configuração para ambiente local vs. Vercel
if (isVercel) {
  // No Vercel, não precisamos chamar listen() - a função é exportada
  console.log('Executando em ambiente Vercel');
  module.exports = app;
} else {
  // Em ambiente local, iniciamos o servidor normalmente
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
