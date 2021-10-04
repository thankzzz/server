const express = require('express');
const Router = express.Router();
const user = require('../Controller/Users.Controller')
const {authJwt} = require('../Middleware/authJwt')

Router.post('/signup',user.signup)
Router.post('/signin',user.signin)
module.exports = Router