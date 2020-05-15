const Product = require('../models/product')
    , User = require('../models/user')

exports.addProduct = async (user, body) => {
    if (checkPermission(user)) {
        const product = new Product(body)
        return await product.save()
    }

    throw User.permissionDenied()
}

exports.updateProduct = async (id, user, body) => {
    if (checkPermission(user)) {
        const qrProduct = await Product.findById(id).exec()
        
        if(body.name) qrProduct.name = body.name
        if(body.description) qrProduct.description = body.description
        if(body.price) qrProduct.price = body.price
        if(body.quatity) qrProduct.quatity = body.quatity 

        return await qrProduct.save()
    }

    throw User.permissionDenied()
}

exports.deleteProduct = async (id, user) => {
    if (checkPermission(user)) return await Product.findOneAndRemove({_id: id}).exec()
    throw User.permissionDenied()
}

const checkPermission = (user) => {
    if (user.role == 'admin') return true
    return false
}