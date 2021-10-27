const sequelize = require('sequelize')
const {Product,Product_brand,Product_category} = require('../model/Products.Model')
const path = require("path");
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');
const { Op } = require("sequelize");

exports.getDataProduct = async(req,res) =>{
    const brand = await Product_brand.findAll()
    const category = await Product_category.findAll()
    const findCategory = (id) => {
        let index = category.findIndex(c=>c.id === id)
       if(index < 0){
           return ''
       }
        return category[index].name
    }
    const findBrand = (id) => {
        let index = brand.findIndex(c=>c.id === id)
        console.log(index)
        if(index < 0){
            return ''
        }
        return brand[index].name
    }
    Product.findAll().then(result=>{
        const currentData = result.map(item=>{
            return{
                checked:false,
                id:item.id,
                name:item.name,
                category: findCategory(item.fk_category_id),
                brand:findBrand(item.fk_brand_id),
                visibility:item.visibility
            }
        })
        res.status(200).json({info:currentData})
    }).catch(err=>{
       
        res.status(404).json({message:err.message})
    })
}
exports.editVisibilityProduct = async(req,res)=>{
    var {id,visibility} = req.body

    Product.update({visibility:visibility},{where:{id:id}}).then(result=>{
        res.status(200).json()
    }).catch(err=>{
        res.status(500).json({message:err.message})
    })
}

exports.createDataProduct = async(req,res) =>{
    
    var imageFile = req.files[0]
    var pdfFile = req.files[1]
    var {name,brand,category,visibility} = req.body
    var imageSource = imageFile?fs.readFileSync(imageFile.path):null;
    var pdfSource =pdfFile?fs.readFileSync(pdfFile.path):null
    var pdfName = pdfFile?pdfFile.originalname:null
    var imageName = imageFile?imageFile.originalname:null
    var id = uuidv1()
    const formData = {
        id:id,
        name:name,  
        fk_brand_id:brand?brand:null,
        fk_category_id:category?category:null,
        visibility:visibility,
        image:imageSource,
        catalog:pdfSource,
        catalog_name:pdfName
    }
    const checkName  = await Product.findOne({where:{name:formData.name}})
    
    if(checkName){
        res.status(500).json({message:'Name already exists'})
    }else{
        Product.create(formData).then(()=>{
            res.status(200).json()
        }).catch(err=>{
            res.status(500).json({message:err.message})
        }) 
        
    }
   
  
   
}

exports.createBrand = async (req,res) =>{
    var imageFile = req.file
    var {name} = req.body
    var imageSource = imageFile?fs.readFileSync(imageFile.path):null;
    var id = uuidv1()
    const formData = {
        id:id,
        name:name,
        image:imageSource
    }
    const checkExist = await Product_brand.findOne({where:{name:name}})

    if(checkExist){
        res.status(500).json({message:'Name already exists'})
    }else{
        Product_brand.create(formData).then(()=>{
            res.status(200).json()
        }).catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
   
}

exports.createCategory = async(req,res) =>{
    var {name} = req.body
    var id = uuidv1()
    const formData = {
        id:id,
        name:name,
    }
    const checkName = await Product_category.findOne({where:{name:formData.name}})

    if(checkName){
        res.status(500).json({message:'Name already exists'})
    }else{
        Product_category.create(formData).then(()=>{
            res.status(200).json()
        }).catch(err=>{
            res.status(500).json({message:err.message})
        })
    }
    
}


exports.getDataBrand = async(req,res) =>{
    Product_brand.findAll().then(result=>{
        if(!result){
            res.status(500).json({message:'No data'})
        }
        res.status(200).json({info:result})
    }).catch(err=>{
        res.status(500).json({message:err.message})
    })
}
exports.getDataCategory = async(req,res) =>{
    Product_category.findAll().then(result=>{
        if(!result){
            res.status(500).json({message:'No data'})
        }
        res.status(200).json({info:result})
    }).catch(err=>{
        res.status(500).json({message:err.message})
    })
}

exports.deleteDataBrand = (req,res)=>{
    const {id} = req.body
    Product_brand.destroy({where:{id:id}}).then((result,error)=>{
        if(error){
            res.status(404).json({message:'Terjadi kesalahan pada database'})
        }
        res.status(200).json()
    }).catch(err=>{
        res.status(500).json({message:err.message})
    })
}

exports.deleteDataCategory = (req,res)=>{
    const {id} = req.body
    Product_category.destroy({where:{id:id}}).then((result,error)=>{
        if(error){
            res.status(404).json({message:'Terjadi kesalahan pada database'})
        }
        res.status(200).json()
    }).catch(err=>{
        res.status(500).json({message:err.message})
    })
}