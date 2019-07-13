const express = require('express');
const router = express.Router();
// Protected Route
router.use(require('../config/auth'));
// Helper Function
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: "Not Authorized"});
}

module.exports = router;