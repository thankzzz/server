const express = require('express');
const Router = express.Router();
const Product = require('../Controller/Products.Controller')
const {authJwt} = require('../Middleware/authJwt')
const upload = require('../Middleware/uploadProduct')

Router.post('/create',[authJwt.verifyToken],upload.any(),Product.create)

module.exports = Router