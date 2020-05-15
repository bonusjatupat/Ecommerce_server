const UserService = require('../services/user')
  , errorHandler = require('../errors')

exports.registration = async (req, res) => {
    try {
        const { body } = req
        const response = await UserService.registration(body)

        res.json(response)
    } catch (err) {
    
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}

exports.authentication = async (req, res) => {
    try {
        const { username, password } = req.body
        const response = await UserService.authentication(username, password)
  
        res.json(response)
    } catch (err) {
      
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}

exports.profile = async (req, res) => {
    try {
        const { user } = req

        res.json(user)
    } catch (err) {
      
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}

exports.updateInfo = async (req, res) => {
    try {
        const { user, body } = req
        const response = await UserService.updateInfo(user, body)

        res.json(response)
    } catch (err) {
      
        const { status, message } = errorHandler(err)
        res.status(status)
        res.json({ message })
    }
}