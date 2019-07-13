const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/api/users/signup', usersController.signup);
router.post('/api/users/login', usersController.login);

module.exports = router;