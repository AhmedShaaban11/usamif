const route = require('express').Router();
const { registerUser, loginUser } = require('../controllers/user.controller.js');

route.post('/register', registerUser);
route.get('/login', loginUser);

module.exports = route;