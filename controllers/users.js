const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  handleWin,
  getWinScore,
  getHighScores
}

function getHighScores(req, res){
  User.find({}).sort('-wins').limit(5).
  then(users=>{
    res.json(users)
  })
}

function getWinScore(req, res){
  User.findById(req.user._id)
  .then(user=>res.json({wins: user.wins })).catch(err=>{
    console.log(err)
  })
}

function handleWin(req, res){
  console.log(req.user)
  User.findById(req.user._id)
  .then(user =>{
    user.wins++;
    user.save();
    res.send('ok')
  }).catch(err=>{
    res.status(400).json(err)
  });
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(401).json({ err: 'Bad credentials' });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: 'Bad credentials' });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

// Helper Function Below
function createJWT(user) {
  return jwt.sign(
    { user },
    SECRET,
    { expiresIn: '24h' }
  )
}