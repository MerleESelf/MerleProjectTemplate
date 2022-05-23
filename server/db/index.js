const { Sequelize, DataTypes } = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/merleapptemplate");

module.exports = { db };