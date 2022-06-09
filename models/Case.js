const Sequelize = require("sequelize");
const db = require("../config/db");
const Case = db.define(
    "case",
    {
        name: {type: Sequelize.STRING},
        deskripsi: {type: Sequelize.STRING},
    },
    {
        freezeTableName: true
    }
);

module.exports = Case;