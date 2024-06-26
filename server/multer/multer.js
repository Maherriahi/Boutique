const multer =require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
   cb(null, '../client/public/images/uploads/')
  //   cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+'-'+file.originalname)
    }
  })
  
exports.upload = multer({ storage: storage })
