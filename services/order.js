const Order = require('../models/order')
    , Product = require('../models/product')
    , User = require('../models/user')

exports.addOrder = async (user, body) => {
    var sendingAddress = ""
    if (body.sendingAddress) sendingAddress = body.sendingAddress
    else sendingAddress = user.personalInfo.address
    console.log(sendingAddress)
    
    var totalPrice = 0
    for (var i=0; i<body.orderList.length; i++) {
        var qrProduct = await Product.findById(body.orderList[i].productId).exec()
        if (qrProduct.quatity > 0) {
            totalPrice += (body.orderList[i].quatity * qrProduct.price)
            qrProduct.quatity -= body.orderList[i].quatity
            await qrProduct.save()
        }
    }

    const order = new Order({
        userId: user._id,
        sendingAddress: sendingAddress,
        orderList: body.orderList,
        totalPrice: totalPrice
    })
    return await order.save()
}

exports.updateStatus = async (id, user, status) => {
    const qrOrder = await Order.findById(id).exec()
    
    if (checkPermission(user, qrOrder)) {
        qrOrder.status = status
        return await qrOrder.save()
    }
    
    throw User.permissionDenied()
}

const checkPermission = (user, order) => {
    if (user.role == 'admin') return true
    if (user._id.equals(order.userId)) return true
    return false
}


