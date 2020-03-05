const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { allowIfLoggedin, grantAccess } = require('../middlewares');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/users', allowIfLoggedin, grantAccess('readAny', 'profile'), userController.getUsers);

module.exports = router;
