const mongoose = require('mongoose')
    , Schema = mongoose.Schema

var OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    sendingAddress: { type: String, required: true },
    sendingMethod: { type: String, default: 'EMS Thai post' },
    orderList: [{
        productId: { type: Schema.Types.ObjectId, required: true },
        quatity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending' }, //'pending', 'paid', 'delivered', 'cancel'
    timeStamp: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('order', OrderSchema)