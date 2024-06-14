const Course = require('../models/course.model.js');
const User = require('../models/user.model.js');

const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).send(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const reviewCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.body.courseId);
        if (!course) { return res.sendStatus(404); }
        if (course.reviews.some(review => review.userId.toString() === req.body.review.userId)) { return res.sendStatus(409); }
        course.reviews.push(req.body.review);
        course.rating = course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length;
        await course.save();
        res.status(200).send(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteAllReviews = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) { return res.sendStatus(404); }
        course.reviews = [];
        course.rating = 0;
        await course.save();
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const likeOrUnlikeCourse = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const course = await Course.findById(req.body.courseId);
        if (!user || !course) { return res.sendStatus(404); }
        const favCourseIdx = user.favCourses.indexOf(course._id);
        if (req.body.isLike === true && favCourseIdx === -1) {
            user.favCourses.push(course._id);
        } else if (req.body.isLike === false && favCourseIdx !== -1) {
            user.favCourses.splice(favCourseIdx, 1);
        } else {
            return res.sendStatus(204);
        }
        await user.save();
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const readCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) { return res.sendStatus(404); }
        res.status(200).send(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const listCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).send(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const listRecentCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).send(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const listHighestRatedCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ rating: -1 }).limit(5);
        res.status(200).send(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const listFavCourses = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) { return res.sendStatus(404); }
        const courses = await Course.find({ _id: { $in: user.favCourses } });
        res.status(200).send(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    createCourse,
    reviewCourse,
    deleteAllReviews,
    likeOrUnlikeCourse,
    readCourse,
    listCourses,
    listRecentCourses,
    listHighestRatedCourses,
    listFavCourses
};