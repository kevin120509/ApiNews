const { DataTypes, Sequelize } = require('sequelize');
const { connection } = require("../config.db");
const { Profile } = require('./profilemodel');


const User = connection.define('user', {
    perfil_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nick: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    UserAlta: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Admin"
    },
    FechaAlta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    UserMod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FechaMod: {
        type: DataTypes.DATE,
        allowNull: true
    },
    UserBaja: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FechaBaja: {
        type: DataTypes.DATE,
        allowNull: true
    },
})

User.belongsTo(Profile, { as: 'perfil', foreignKey: 'perfil_id' })

module.exports = { User };