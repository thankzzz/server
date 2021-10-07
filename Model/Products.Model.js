const Sequelize = require('sequelize');
const db = require('../Database/database')

const Product = db.define('users_login',{
    id:{
        primaryKey:true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV1,   
    },
    name:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    image:{
        type:Sequelize.BLOB('medium'),
        allowNull:true
    },
    catalog:{
        type:Sequelize.BLOB('medium'),
        allowNull:true
    }
})

module.exports = {Product}