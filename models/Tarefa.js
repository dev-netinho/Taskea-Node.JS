const { DataTypes, Model, Sequelize } = require('sequelize');

class Tarefa extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,  
                autoIncrement: true
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('pendente', 'em andamento', 'concluida'),
                defaultValue: 'pendente',
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Tarefa',
            tableName: 'tarefas' 
        });
    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id',
            onDelete: 'CASCADE',
        });
    }
}

module.exports = Tarefa;