const express = require('express');
const Router = express.Router();
const Product = require('../Controller/Products.Controller')
const {authJwt} = require('../Middleware/authJwt')
const upload = require('../Middleware/uploadProduct');



Router.post('/create',authJwt.verifyToken,upload.any(),Product.createDataProduct)
Router.get('/data',authJwt.verifyToken,Product.getDataProduct)
Router.post('/visibility',authJwt.verifyToken,Product.editVisibilityProduct)
Router.post('/brand/create',authJwt.verifyToken,upload.single('imageFile'),Product.createBrand)
Router.get('/brand/data',authJwt.verifyToken,Product.getDataBrand)
Router.put('/brand/delete',authJwt.verifyToken,Product.deleteDataBrand)


Router.post('/category/create',authJwt.verifyToken,Product.createCategory)
Router.get('/category/data',authJwt.verifyToken,Product.getDataCategory)
Router.put('/category/delete',authJwt.verifyToken,Product.deleteDataCategory)



module.exports = Router