const Sequelize = require("sequelize");
const db = require('./db');
const Usuario = require('./Usuario');
const Sala = require('./Sala');

const Mensagem = db.define('mensagens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mensagem: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    salaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Mensagem.belongsTo(Usuario, {foreignKey: 'usuarioId', allowNull: false});
Mensagem.belongsTo(Sala, {foreignKey: 'salaId', allowNull: false});


//Criar a tabela no banco
// Mensagem.sync();



//Apaga a tabela e cria novamente
// Mensagem.sync({force: true})

// Mensagem.sync({alter: true})

module.exports = Mensagem;