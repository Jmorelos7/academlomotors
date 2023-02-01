const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
    defaultValue: 'client',
    enum: ['client', 'employee'],
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:'available',
    enum: ['available', 'disabled']
  },
});
// aquí creamos un modelo y siempre se empieza con mayuscula

module.exports = User;

