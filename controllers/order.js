const OrderService = require('../services/order')
  , errorHandler = require('../errors')

exports.addOrder = async (req, res) => {
    try {
        const { user, body } = req
        const response = await OrderService.addOrder(user, body)

        res.json(response)
    } catch (err) {
    
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.params.status
        const { user } = req
        const response = await OrderService.updateStatus(id, user, status)

        res.json(response)
    } catch (err) {
    
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}
