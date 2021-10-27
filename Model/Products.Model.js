const Sequelize = require('sequelize');
const db = require('../Database/database')

const Product = db.define('tb_product',{
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
    visibility:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    catalog:{
        type:Sequelize.BLOB('medium'),
        allowNull:true
    },
    catalog_name:{
        type:Sequelize.STRING(50),
        allowNull:true
    }
})

const Product_brand = db.define('tb_product_brand',{
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
    }
})

const Product_category = db.define('tb_product_category',{
    id:{
        primaryKey:true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV1,  
    },
    name:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
})


Product_brand.hasMany(Product,{foreignKey:{name:'fk_brand_id'},sourceKey:'id'})
Product_category.hasMany(Product,{foreignKey:{name:'fk_category_id'},sourceKey:'id'})



Product.associate = ()=>{
    Product.belongsTo(Product_brand,{foreignKey:'fk_brand_id',targetKey:'id'})
}
Product.associate = ()=>{
    Product.belongsTo(Product_category,{foreignKey:'fk_category_id',targetKey:'id'})
}
module.exports = {Product,Product_brand,Product_category}