const User = require('../models/user')
    , jwt = require('jwt-simple')


const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY"

exports.registration = async (body) => {
    const defaultUser = {
        registerMethod: 'normal'
    }
    const user = new User(Object.assign(body, defaultUser))
  
    return await user.save()
}

exports.authentication = async (username, password) => {
    const user = await User.findOne({ username }).exec()

    if (user) {
        const isMatch = await user.comparePassword(password)

        if (isMatch) {
        let token = jwt.encode({
            id: user._id,
            sub: user.username,
            iat: new Date().getTime(),
        }, JWT_SECRET)
        
        return { token }
        }
    }
    throw User.userNotFound()
}

exports.updateInfo = async (user, body) => {
    const qrUser = await User.findById(user._id).exec()

    if(body.personalInfo.firstname) qrUser.personalInfo.firstname = body.personalInfo.firstname
    if(body.personalInfo.lastname) qrUser.personalInfo.lastname = body.personalInfo.lastname
    if(body.personalInfo.address) qrUser.personalInfo.address = body.personalInfo.address
    if(body.personalInfo.phone) qrUser.personalInfo.phone = body.personalInfo.phone
    
    return await qrUser.save()
}