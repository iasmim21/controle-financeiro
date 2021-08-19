const Sequelize = require('sequelize');
const db = require('./db');

const Extrato = db.define('extratos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    type: {//1 - pagamento / 2- recebido
        type: Sequelize.INTEGER,
        allowNull: false
    },
    situation: {//1 - pago / 2- pendente / 3- Recebido / 4 - A receber
        type: Sequelize.INTEGER,
        allowNull: true
    },
    payday: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

//Extrato.sync({ alter: true }); //caso tenha alterações na tabela ele executa
Extrato.sync(); //cria a tabela apenas se ela não existir

module.exports = Extrato;

