const multer = require('multer')
const path = require("path");


const Storage = multer.diskStorage({
  destination:function(req,file,cb){
      if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){
         cb(null, path.join(__dirname + '../../Assets/Image'))
      }else if(file.mimetype === 'application/pdf') {  
        cb(null, path.join(__dirname + '../../Assets/Pdf'))
    } else{
      cb({ error: 'Mime type not supported' })
    }
  },
    // destination: path.join(__dirname + '../../Assets/Image'),
    filename: function (req, file, cb) {
      var originalName = file.originalname
      var splitName = originalName.split('.')[0]
      cb(null, file.fieldname + '-' + splitName + path.extname(file.originalname))
    }
    
  })
  
  
  function checkFileType(file, cb,res) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|jpe|pdf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    //check size
    const size = 35000
  
    if (mimetype && extname) {
      return cb(null, true);
     
    } else {
      
      cb('Error: PDF and image Only!');
    }
  }
  const upload = multer({
    storage: Storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })

  module.exports = upload