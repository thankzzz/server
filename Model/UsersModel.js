const Sequelize = require('sequelize');
const db = require('../Database/database')

const Users_login = db.define('users_login',{
    id:{
        primaryKey:true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV1,   
    },
    username:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false
    },
    role:{
        type:Sequelize.STRING(50),
        allowNull:false
    }
})

module.exports = {Users_login}