const {Users_login} = require("../Model/UsersModel")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const uuid = require('uuid')
exports.signup = async(req,res) => {
    const formData = {
        id:uuid.v4(),   
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password, 8),
        role:req.body.role
    }
    const user = await Users_login.findOne({where:{username:formData.username}})
    if(user){
        return res.status(404).send({message:"The user with username has already been registered"})
    }
    Users_login.create(formData).then(()=>{
        res.status(200).json()
    }).catch(err=>{
        res.status(500).json({message:"Fail to create user"+ err.message})
    })
}

exports.signin = (req,res) => {
    console.log(req.body.username)
    Users_login.findOne({where:{username:req.body.username}}).then(user=>{
        if(!user){
            return res.status(404).json({message:'The user has not been registered'})
        }
        var passwordValid = bcrypt.compareSync(req.body.password,user.password)
        if(!passwordValid){
            return res.status(404).send({accessToken:null,message:'Invalid password'})
        }
        var token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:14400})
        res.status(200).json({
            id: user.id,
            username: user.username,
            accessToken: token
        })
    }).catch(err=>{
        res.status(500).json({message:'Fail to sign in'+ err.message})
    })
}