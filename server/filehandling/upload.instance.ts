const multer = require('multer')

const storage = multer.diskStorage({
  destination : function(_ : any , __ : any ,cb : any) {
    return cb(null,'./uploads')
  },
  filename : function(req : any ,file : any ,cb : any) {
    return cb(null,req.body.email+'-'+Date.now() + "-" + file.originalname)
  }
}) 

const upload = multer({storage})

export default upload