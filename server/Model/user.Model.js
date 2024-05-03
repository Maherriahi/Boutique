const mongoose=require('mongoose')
const SchemaUser=mongoose.Schema

//schema user-------------------------------------------------------------------------
const UserSchema = new SchemaUser({
    Email:String,
    Password:String,
},{timestamps:true})
const User= mongoose.model('user',UserSchema)
//--------------------------------------------------------------------------------------


//schema image
const SchemaImageProfil=mongoose.Schema
const ProfileImage =new SchemaImageProfil({
    image:String,
    user:{
        type:SchemaImageProfil.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})
const Image=mongoose.model('image',ProfileImage)
//---------------------------------------------------------------------------------------



//schema profile
const SchemaProfil=mongoose.Schema
const ProfilSchema=new SchemaProfil({
    user:{
        type:SchemaProfil.Types.ObjectId,
        ref:"user",
        required:true
    },
    lastName:String,
    firstName:String,
    Tel:String,
    Address:String,
    Country:String, 
    City:String,
    PostalCode:Number,
    Email:{
        type:SchemaProfil.Types.String,
        ref:"user",
        required:true
    }
},{timestamps:true})
const Profile=mongoose.model('profil',ProfilSchema) 
//--------------------------------------------------------------------------------------


//SchemaProducts
const SchemaProducts=mongoose.Schema
const ProductsSchema=new SchemaProducts({
})
const Products=mongoose.model('product',ProductsSchema)
//-------------------------------------------------------------------------------------

//SchemaclientProducts
const SchemaclientProducts=mongoose.Schema
const ProductsclientSchema=new SchemaclientProducts({
    image:String,
    title:String,
    price:Number,
    quantity:Number,
    description:String,
    user:{
        type:SchemaclientProducts.Types.ObjectId,
        ref:'user',
        required:true
         }
},{timestamps:true})
const MyProducts=mongoose.model('myproduct',ProductsclientSchema)
//----------------------------------------------------------------------------------------



//export
module.exports={
    User,
    Profile,
    Image,
    Products,
    MyProducts
}
//--------------------------------------------------------------------------------------





//t7ib ta3mil kol shema fi fichier kima (project :cluster)
// wila t7thom ilkol fi fichier wa7da wta3mil lihom export ilkol