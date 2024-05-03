
const { Products, MyProducts } = require('../Model/user.Model')


const getAllProducts = async (req, res, next) => {
    try {
        await Products.find().select(['id', 'title', 'price', 'description', 'category', 'image'])
            .then((products) => {
                res.status(202).json(products)
            })
    } catch (error) {
        console.log(error.message)
    }
}


const clientProducts = async (req, res, next) => {
    try {
        console.log(req)
        console.log('user  :', req.user.id)
        //req.body.user = req.user.id
        await MyProducts.create(req.body)
            .then((MyProd) => {
                res.status(202).json({
                    message: "success !",
                    products: MyProd
                })

            }).catch((error) => console.log(error))

    } catch (error) {
        console.log(error.message)
    }
}


const getProductClient = async (req, res, next) => {
    try {
        await MyProducts.find({ user: req.user.id })
            .then(async(user) => {
                if (user.length==0){
                 await   res.status(201).json({
                        message: "you don't have any things",
                        user: {}
                    })
                }else{
                 await    res.status(202).json({
                        user:user,
                        message: "this is your products",
                    })
                }
                   
            })




    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getAllProducts,
    clientProducts,
    getProductClient
}