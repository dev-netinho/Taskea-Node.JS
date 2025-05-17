const { DataTypes, Model, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },  
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            senha: {
                type: Sequelize.VIRTUAL
            },
            senha_hash:  {
                type: DataTypes.STRING, 
            }, 
        }, {
            sequelize,
            modelName: 'Usuario',
            tableName: 'usuarios'
        });

        this.addHook('beforeSave', async usuario => {
            if (usuario.senha) {
                usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
            }
        });

        return this;
    }

    checkPassword(senha) {
       return bcrypt.compare(senha, this.senha_hash);
    }

    static associate(models) {
        this.hasMany(models.Tarefa);
    }
}

module.exports = Usuario;