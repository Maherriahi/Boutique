var express =require('express')
const { Login, Register, Test } = require('../controller/user.Controller')
const {  addProfile,  getProfile, getFindOneProfile,  addMulterImage, findProfileImage } = require('../controller/profil.controller')
const passport=require('passport')
const { upload } = require('../multer/multer')
const { getAllProducts, clientProducts, getProductClient } = require('../controller/products.controller')

// const multer =require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now()
//       cb(null,uniqueSuffix +'-'+file.originalname)
//     }
//   }) 
// const upload = multer({ storage: storage })

 var route=express.Router()

route.post('/login',Login)
route.post('/register',Register)
route.get('/allProfile',getProfile)
route.get('/allProducts',getAllProducts)
route.get('/clientProd',
passport.authenticate('jwt', { session: false })
,getProductClient)
route.post('/myProducts',
passport.authenticate('jwt', { session: false })
,clientProducts)
route.get('/findOneProfile',
passport.authenticate('jwt', { session: false })
,getFindOneProfile)
route.post('/addProfile',
passport.authenticate('jwt', { session: false }),
addProfile)
route.get('/findProfileImage',
passport.authenticate('jwt', { session: false }),
findProfileImage)
route.post('/addMulterImage',
passport.authenticate('jwt', { session: false }),
upload.single('image'),

addMulterImage)




module.exports=route