const sequelize = require("sequelize");

const connection = new sequelize('games','root','123456',{
    host:'localhost',
    dialect:'mysql',
    timezone:'-03:00'
});

module.exports = connection;