require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route.js');
const courseRoute = require('./routes/course.route.js');
const refreshTokenRoute = require('./routes/refresh.token.route.js');

app.set('views', path.join(__dirname, 'static/views'));
app.set('view engine', 'pug');

app.use('*/static', express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('register');
});

app.use('/api/refresh', refreshTokenRoute);
app.use('/api/users/', userRoute);
app.use('/api/courses/', courseRoute);

app.use((req, res) => {
    res.sendStatus(404);
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB...');
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => console.error('Could not connect to MongoDB...'));

