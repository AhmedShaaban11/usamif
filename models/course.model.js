const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: [{
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            rating: {type: Number, required: true, min: 1, max: 5},
            comment: {type: String},
        }],
    },
    {
        timestamps: true
    }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
