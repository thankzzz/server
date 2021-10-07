const sequelize = require('sequelize')
const {Product} = require('../model/Products.Model')
const path = require("path");
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');
const { Op } = require("sequelize");

exports.create = (req,res) =>{
    var imageFile = req.files[0]
    var pdfFile = req.files[1]
    var {name,brand,type,visibility,image,catalog} = req.body
    var imageSource = imageFile?fs.readFileSync(imageFile.path):null;
    var pdfSource =pdfFile?fs.readFileSync(pdfFile.path):null
    var pdfName = pdfFile?pdfFile.originalname:null
    var imageName = imageFile?imageFile.originalname:null
    var id = uuidv1()
    const formData = {
        id:id,
        name:name,
        brand:brand,
        type:type,
        visibility:visibility,
        image:imageSource,
        catalog:pdfSource
    }
    Product.create(formData).then(()=>{
        res.status(200).json()
    }).catch(err=>{
        res.status(500).json({message:err.message})
    })
}