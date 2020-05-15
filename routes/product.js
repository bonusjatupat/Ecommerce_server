const router = require('express').Router()
    , productController = require('../controllers/product')
    , { requireJWTAuth } = require('../middlewares/jwt')

router.post('/add', requireJWTAuth , productController.addProduct)
      .patch('/update/:id', requireJWTAuth, productController.updateProduct)
      .delete('/delete/:id', requireJWTAuth, productController.deleteProduct)
      
module.exports = router;