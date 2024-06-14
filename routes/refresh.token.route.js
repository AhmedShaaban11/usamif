const router = require('express').Router();
const { handleRefreshToken } = require('../controllers/refresh.token.controller.js');

router.get('/', handleRefreshToken);

module.exports = router;
