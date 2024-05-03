const joi =require('joi')


//valid user
const validRegister=(data)=>{
let errors={}
let isError;

let Email=joi.string().email({minDomainSegments :2,tlds :{allow :['com','fr','net','tn']}}).required()
let Password=joi.string().max(8).min(4).alphanum().required()
let ConfirmPass=joi.string().max(8).min(4).alphanum().required()

const EmailValid=Email.validate(data.Email)
const PasswordValid=Password.validate(data.Password)
const ConfirmPassValid=Password.validate(data.ConfirmPass)

if(EmailValid.error){
   errors.Email=" Forma Email required !" 
   isError=true
}

if(PasswordValid.error){
    errors.Password="Password invalid !"
    isError=true
}

if((ConfirmPassValid.error)||(data.Password != data.ConfirmPass)){
    errors.ConfirmPass="Password doesn't confirm !"
    isError=true
}

return{errors,isError}

}

//validLogin
const validLogin=(data)=>{
let errors={}
let isError;

const Email=joi.string().email({maxDomainSegments :2,tlds:{allow:['fr','tn','com','net']}}).required()
const Password =joi.string().max(8).min(4).alphanum().required()

const EmailValid=Email.validate(data.Email)
const PasswordValid=Password.validate(data.Password)

if(EmailValid.error){
    errors.Email="Forma email required !"
    isError=true
}

if(PasswordValid.error){
    errors.Password="Password invalid !"
    isError=true
}

return{isError,errors}
}


//validProfile
const validProfile=(data)=>{
    let errors={}
    let isError;
   const lastName =joi.string().max(20).min(3).required()
   const firstName =joi.string().max(20).min(3).required()
   const Address =joi.string().max(20).min(3).required()
   const Country =joi.string().max(20).min(3).required()
   const City =joi.string().max(20).min(3).required()
   const Tel =joi.number().min(10**7).max(10**13 -1).required()
   const PostalCode =joi.number().min(10**3).max(10**6 -1).required()

   const validlastName=lastName.validate(data.lastName)
   const validfirstName=firstName.validate(data.firstName)
   const validAddress=Address.validate(data.Address)
   const validCountry=Country.validate(data.Country)
   const validCity=City.validate(data.City)
   const validTel=Tel.validate(data.Tel)
   const validPostalCode=PostalCode.validate(data.PostalCode)

if(validlastName.error){
errors.lastName=" lastName is required !"
isError=true
}
if(validfirstName.error){
    errors.firstName=" firstName is required !"
    isError=true
}
if(validAddress.error){
    errors.Address=" Address is required !"
    isError=true
}
if(validCountry.error){
    errors.Country=" Country is required !"
    isError=true
}
if(validCity.error){
    errors.City=" City is required !"
    isError=true
}
if(validTel.error){
    errors.Tel=" Telephone is required !"
    isError=true
}
if(validPostalCode.error){
    errors.PostalCode=" Postal code is required !"
    isError=true
}
return {isError,errors}
}


module.exports={
    validRegister,
    validLogin,
    validProfile
}