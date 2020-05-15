const router = require('express').Router()
    , orderController = require('../controllers/order')
    , { requireJWTAuth } = require('../middlewares/jwt')

router.post('/add', requireJWTAuth, orderController.addOrder)
      .patch('/update/:status/:id', requireJWTAuth, orderController.updateStatus)
      
module.exports = router;