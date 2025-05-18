const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Configuração para ambiente Railway
const isProduction = process.env.NODE_ENV === 'production';

// Determine o caminho do banco de dados
// No Railway, podemos usar um caminho absoluto normal
const dbPath = isProduction 
  ? path.resolve(__dirname, '../../data/tarefas.db')
  : path.resolve(__dirname, '../../data/tarefas.db');

// Certifique-se de que o diretório existe
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`Diretório criado: ${dbDir}`);
}

// Configuração do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

module.exports = sequelize;
