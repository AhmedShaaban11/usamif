const route = require('express').Router();
const { registerUser, loginUser } = require('../controllers/user.controller.js');

route.post('/signup', registerUser);
route.get('/login', loginUser);

module.exports = route;