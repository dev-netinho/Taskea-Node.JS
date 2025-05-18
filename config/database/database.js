const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Determine o caminho do banco de dados com base no ambiente
const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel 
  ? '/tmp/tarefas.db'  // Na Vercel, use /tmp para armazenamento temporário
  : path.resolve(__dirname, '../../data/tarefas.db');

console.log(`Inicializando banco de dados em: ${dbPath}`);

// Certifique-se de que o diretório existe
try {
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log(`Diretório criado: ${dbDir}`);
  }
} catch (err) {
  console.error(`Erro ao criar diretório: ${err.message}`);
}

// Configuração do Sequelize com tratamento de erro
let sequelize;
try {
  // Em ambiente Vercel, tente primeiro em modo somente leitura
  if (isVercel) {
    console.log('Tentando inicializar SQLite em modo somente leitura');
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false,
      dialectOptions: {
        mode: 1 // OPEN_READONLY
      }
    });
  } else {
    // Em ambiente local, use modo leitura/escrita
    console.log('Inicializando SQLite em modo leitura/escrita');
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false
    });
  }
} catch (err) {
  console.error(`Erro ao inicializar Sequelize: ${err.message}`);
  
  // Fallback para configuração mais simples
  console.log('Tentando configuração alternativa do SQLite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // Usar banco em memória como último recurso
    logging: false
  });
}

module.exports = sequelize;
