const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Determine o caminho do banco de dados com base no ambiente
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/tarefas.db'  // Na Vercel, use /tmp para armazenamento temporário
  : path.resolve(__dirname, '../../data/tarefas.db');

// Certifique-se de que o diretório existe
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Configuração simplificada do Sequelize com sqlite3
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
  dialectOptions: {
    // Opções específicas para melhorar a compatibilidade com Vercel
    mode: process.env.NODE_ENV === 'production' ? 1 : 2 // 1 = OPEN_READONLY, 2 = OPEN_READWRITE
  }
});

module.exports = sequelize;
