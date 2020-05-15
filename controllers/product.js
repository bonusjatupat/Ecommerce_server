const ProductService = require('../services/product')
  , errorHandler = require('../errors')

exports.addProduct = async (req, res) => {
    try {
        const { user, body } = req
        const response = await ProductService.addProduct(user, body)

        res.json(response)
    } catch (err) {
    
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { user, body } = req
        const response = await ProductService.updateProduct(id, user, body)

        res.json(response)
    } catch (err) {
    
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { user } = req
        const response = await ProductService.deleteProduct(id, user)

        res.json(response)
    } catch (err) {
    
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}