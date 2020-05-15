const router = require('express').Router()
    , userController = require('../controllers/user')
    , { requireJWTAuth } = require('../middlewares/jwt')

router.post('/signup', userController.registration)
      .post('/signin', userController.authentication)
      .patch('/updateInfo', requireJWTAuth, userController.updateInfo)
      .get('/profile', requireJWTAuth, userController.profile)
      
module.exports = router;