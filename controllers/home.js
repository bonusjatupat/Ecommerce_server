const HomeService = require('../services/home')
  , errorHandler = require('../errors')

exports.homePage = async (req, res) => {
  try {
    const body = req.body
    const response = await HomeService.register(body)

    res.json(response)
  } catch (err) {
    
    const { status, message } = errorHandler(err)
    res.status(status)
    res.json({ message })
  }
}