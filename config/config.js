// Config Sequelize

const Sequelize = require("sequelize");
require("dotenv").config;

module.exports = new Sequelize(
    process.env['dbName'],
    process.env['dbUser'],
    process.env['dbPwd'],{
    host:"localhost",
    dialect:"mysql",
    logQueryParameters: "true"}
);