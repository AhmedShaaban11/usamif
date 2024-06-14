const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) { return res.sendStatus(401); }
    const refreshToken = cookies.refreshToken;
    try {
        const query = User.where({ refreshToken });
        const user = await query.findOne();
        if (!user) { return res.sendStatus(403); }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user._id.toString() !== decoded.userId) { return res.sendStatus(403); }
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );
            res.json({ accessToken });
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { handleRefreshToken };