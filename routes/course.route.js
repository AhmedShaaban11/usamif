const route = require('express').Router();
const courseController = require('../controllers/course.controller.js');
const verifyJWT = require('../middlewares/verifyJWT.js');

route.get('/', courseController.listCourses);
route.get('/recent', courseController.listRecentCourses);
route.get('/highest-rated', courseController.listHighestRatedCourses);
route.get('/:courseId', courseController.readCourse);
route.delete('/review/:courseId', courseController.deleteAllReviews);

route.use(verifyJWT);

route.get('/fav/:userId', courseController.listFavCourses);
route.post('/', courseController.createCourse);
route.post('/fav/', courseController.likeOrUnlikeCourse);
route.post('/review', courseController.reviewCourse);

module.exports = route;