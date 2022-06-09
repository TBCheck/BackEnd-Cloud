const sequelize = require("sequelize");
const db = new sequelize("capstone", "root", "", {
    dialect: "mysql"
});

db.sync({});

module.exports = db;