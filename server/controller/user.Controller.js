const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {User}=require('../Model/user.Model')
const {  validRegister, validLogin } = require('../validate/joi.validate')

//login
const Login =async(req ,res ,next)=>{
    const {errors,isError}=validLogin(req.body)
try {
    if(isError){                       //--1--vaerif validate inpute
        res.status(404).json(errors)
    }else{
    await User.findOne({Email:req.body.Email})  //--2--verif Email entreé
    .then(async(user)=>{
        if(!user){                                  //--si oui
        errors.Email="User not found !"
        res.status(404).json(errors)
        }else{
            bcrypt.compare(req.body.Password,user.Password)
            .then(async(exist)=>{
                if(!exist){
              errors.Password="Password invalid !"
              res.status(404).json(errors)
                }else{
                    var token=jwt.sign({  //si non
                        id:user._id,
                        Email:user.Email

                    },process.env.PRIVATE_KEY,{expiresIn:"1d"}) 
                    res.status(201).json({
                        message :" success to connect !",
                        loginToken:"Bearer "+ token,
                         
                    })
                }
            })
            
            
        }

    })
    }

} catch (error) {
    res.status(404).json(error.message)
}


}


//register
const Register = async(req ,res ,next)=>{
  const {errors,isError} =validRegister(req.body)
    try {
         if(isError){
          await res.status(404).json(errors)
         }else{
        await  User.findOne ({Email:req.body.Email})
          .then(async (exist)=>{
            if(exist){
                errors.Email="User existe"
                res.status(404).json(errors)
            }else{
                const hashPassword=bcrypt.hashSync(req.body.Password,10)
                req.body.Password=hashPassword

                await  User.create(req.body)
                res.status(202).json({message:"user added with success !"})
            }
          })
         }
      
        
    } catch (error) {
         res.status(404).json(error.message)
    }

}

//test
const Test=async(req, res ,next)=>{
res.send(req.user)
console.log(req)
}

//export
module.exports={
    Login,
    Register,
    Test
}