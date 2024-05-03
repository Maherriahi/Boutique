
const { Profile, Image } = require('../Model/user.Model')
const { validProfile } = require('../validate/joi.validate')


//profile
const addProfile = async (req, res, next) => {

    const { errors, isError } = validProfile(req.body)
    try {
        if (isError) {
            res.status(404).json(errors)
        } else {
            await Profile.findOne({ user: req.user.id })
                .then(async (profile) => {
                    if (!profile) {
                        console.log("request data :", req.user.id)
                        req.body.user = req.user.id
                        req.body.Email = req.user.Email
                        await Profile.create(req.body)
                        res.status(202).json({ message: "Profile create with success !" })
                    } else {
                        await Profile.findOneAndUpdate({ _id: profile._id }, req.body, { new: true })
                            .then((result) => {
                                res.status(202).json({
                                    result,
                                    message: "Profile Update with success !"
                                })
                            })
                    }

                })
        }



    } catch (error) {
        res.status(404).json(error.message)
    }
}


//getprofile

const getProfile = async (req, res) => {
    try {
        const data = await Profile.find()
        res.status(201).json(data)
    } catch (error) {
        console.log(error.message)
    }
}

//FindProfileimage
const findProfileImage = async (req, res) => {
    try {
        await Image.findOne({user:req.user.id}).select(['user','image'])
            .then((image) => {
                if (!image)
                    res.status(404).json({ image: "failed  !" })
                else
                    res.status(202).json({
                 image:image
                 })

            })
    } catch (error) {
        console.log(error.message)
        res.status(404).json(error)
    }
}

//addimageUsingMulter
const addMulterImage = async (req, res) => {
    const file = req.file.filename
    console.log(req)

    try {
        await Image.findOne({ user: req.user.id }).select('image')
            .then(async(image) => {
                if (!image) {
                    await Image.create({
                        user: req.user.id,
                        image: file,
                    })
                  res.status(202).json({
                     message: 'add with success ! !',
                     profile:image
                     })
                } else{
                    await Image.findOneAndUpdate({_id:image._id},{image:file}).select('image')
                    res.status(202).json({
                         message: 'Update with success !' ,
                         profile:image

                        })

                }
                })
        } catch (error) {
    console.log(error.message)
}
    }
 

//findOne
const getFindOneProfile = async (req, res) => {
    let profileOne = {}
    try {
        await Profile.findOne({ user: req.user.id })
            .then((profile) => {
                if (!profile)
                    res.status(202).json({
                        message: "This user don't have Profile !",
                        profile: profileOne
                    })
                else
                    res.status(202).json({
                        message: "This is your profile !",
                        profile,
                    })


            })
    } catch (error) {
        res.status(404).json(error.message)
    }
}



//export
module.exports = {
    addProfile,
    getProfile,
    getFindOneProfile,
    findProfileImage,
    addMulterImage,

}