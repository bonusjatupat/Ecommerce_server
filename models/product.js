const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types;
var ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    price: { type: Number, required: true },
    quatity: { type: Number, default: 100 }
})

module.exports = mongoose.model('product', ProductSchema)