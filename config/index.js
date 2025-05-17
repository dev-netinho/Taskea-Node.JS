const Tarefa = require('../models/Tarefa.js');
const Usuario = require('../models/Usuario.js');
const sequelize = require('./database/database.js')

models = [Tarefa, Usuario]

class Database {
    constructor() { 
        this.init();
    }

    async init() {
        this.connection = sequelize;
        models.forEach(model => model.init(this.connection));
        this.associate();
        await this.connection.sync(); 
    }

    associate() {
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

module.exports = new Database();