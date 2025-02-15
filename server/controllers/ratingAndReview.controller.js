const RatingAndReview = require('../models/ratingAndReview.model.js')
const Course = require('../models/course.model.js')



// create Rating
exports.createRating = async(req,res) => {
    try{
        // get user id
        const userId = req.user.id
        // fetchData from req body
        const {rating,review,courseId} = req.body
        // check if user is enrolled or not
        const cousreDetails = await Course.findOne(
                                                {_id:courseId,
                                                studentsEnrolled:{iseleMatch:{$eq:userId}}
                                                })
        if(!cousreDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }
        // check if user already reviewd the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                        user:userId,
                                                        course:courseId
                                                    })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewved by user"
            })
        }
        // create rating amd review
        const ratingReview = await RatingAndReview.create({
                                    rating,review,
                                    course:courseId,
                                    user:userId,
                                })
       
        // upate cousre with this ratinga nd Review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push:{
                                            ratingAndReview:ratingReview._id
                                        }
                                    },
                        
                                    {new:true})
        console.log(updatedCourseDetails)
        // return response
        return res.status(200).json({
            success:true,
            message:"Rating And Review created Successfully",
            ratingReview
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get average Rating
exports.getAverageRating = async(req,res) => {
    try{
        // get Cousre Id
        const courseId = req.body.courseId
        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])
        // return rating
        if(result.length>0){
            return res.status(200).json({
                successs:true,
                averageRating:result[0].averageRating,
            })
        }

        // if no rating and review exist
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, no ratings given till now",
            averageRating:0,
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// get all Rating
exports.getAllRating = async(req,res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                        .sort({rating:"desc"})
                                        .populate({
                                            path:"user",
                                            select:"firstName lastName email image",
                                        })
                                        .populate({
                                            path:"cousre",
                                            select:"cousreName"
                                        })
                                        .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

