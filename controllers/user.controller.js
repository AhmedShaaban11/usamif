const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const query = User.where({ username: req.body.username });
        let user = await query.findOne();
        if (!user) { return res.sendStatus(404); }
        if (user.password !== req.body.password) { return res.sendStatus(403); }
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 5 * 60 * 1000 });
        res.status(200).send({ user, accessToken });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { registerUser, loginUser };