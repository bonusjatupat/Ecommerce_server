const router = require('express').Router();
const homeController = require('../controllers/home');

router.get('/', homeController.homePage);

module.exports = router;