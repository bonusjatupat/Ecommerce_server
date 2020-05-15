const mongoose = require('mongoose')
    , bcrypt = require('bcrypt')
    , Schema = mongoose.Schema
    , { USER_NOT_FOUND, USER_PERMISSION_DENIED } = require('../errors/IERROR');  

const SALT_WORK_FACTOR = 10

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    personalInfo: {
        firstname: { type: String, default: null },
        lastname: { type: String, default: null },
        address: { type: String, default: null },
        phone: { type: String, default: null }
    },
    role: { type: String, default: 'user' }, // 'user', 'admin'
    registerMethod: { type: String, required: true }
})

UserSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

UserSchema.statics.userNotFound = () => {
    return {
      name: USER_NOT_FOUND,
      message: 'User not found in database'
    }
}

UserSchema.statics.permissionDenied = () => {
    return {
      name: USER_PERMISSION_DENIED,
      message: 'User read / write access is forbidden.'
    }
}

module.exports = mongoose.model('user', UserSchema);