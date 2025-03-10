const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        required:true
    },
    courseDescription:{
        type:String
    },
    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    whatYouWillLearn:{
        type:String
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Section'
        }
    ],
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'ratingAndReview'
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

module.exports = mongoose.model('Course',courseSchema)

