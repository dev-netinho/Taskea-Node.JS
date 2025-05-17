const express = require('express');
const path = require('path')
const app = express();
const tarefasRoutes = require('./routes/tarefas.js');
const authRoutes = require('./routes/auth.js');
const database = require('./config/index.js');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tarefas', tarefasRoutes);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
