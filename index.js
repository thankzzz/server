const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const user = require('./Router/Users.Router')
const db = require('./Database/database')
db.sync({force:false});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin:["http://localhost:3006","http://localhost:3000"],
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    preflightContinue: false
} 

app.use(cors())                                                                             
app.use('/api/user',cors(corsOptions),user)
app.listen('8080',()=>{
    console.log('koneksi ke server berhasil')
})