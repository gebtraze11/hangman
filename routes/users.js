const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/api/users/signup', usersController.signup);
router.post('/api/users/login', usersController.login);
router.get('/api/highscores', usersController.getHighScores)

router.use(require('../config/auth'))
router.get('/api/users', usersController.getWinScore)
router.put('/api/users', usersController.handleWin)



function checkAuth(req, res, next){
    if(req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized'})
}

module.exports = router;