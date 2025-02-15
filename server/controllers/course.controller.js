const Course = require('../models/course.model.js')
const Tag = require('../models/category.model.js')
const User = require('../models/user.model.js')
const uploadImageToCloudinary = require('../utils/imageUploader.js')
// const isInstructor = require('../middlewares/auth.middleware.js')

// create course handler function
exports.createCourse = async (req,res) => {
    try{
        // fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag} = req.body

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseDescription || !courseName || !whatYouWillLearn || !thumbnail || !price || !tag){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        // check for instructor detail
        const userId = req.user.id
        const instructorDetails = await User.findById(userId)
        console.log("Instructor detail",instructorDetails)

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        // check given tag is valid or not
        tagDetails = await Tag.findById(tag)
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tag details not found"
            })
        }

        // upload image to clodinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)

        // create an entry for new course 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            Instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url

        })

        // add new cousre to the userSchema of instructor
        await User.findByIdAndUpdate(
            {id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true}
        )

        // update tag schema


        // return response
        return res.status(200).json({
            success:true,
            message:"Course created sucessfully",
            data:newCourse
        })

    }catch(error){
        console.log("Error while creating new course",error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get all courses
exports.showAllCourses = async(req,res) => {
    try{
        const allCourses = await Course.find({},{courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                Instructor:true,
                                                ratingAndReview:true,
                                                studentsEnrolled:true})
                                                .populate("intructor")
                                                .exec();
                                    
        return res.status(200).json({
            success:true,
            message:"data for all courses fetched sucessfully",
            data:allCourses
        })

    }catch(error){
        console.log("Error while getting courses",error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get all course details
exports.getCourseDetail = async(req,res) => {
    try{
        // get id
        const {courseId} = req.body

        // find course detail
        const courseDetails = await Course.find(
                                    {_id:courseId})
                                    .populate(
                                        {
                                            path:"Instructor",
                                            populate:{
                                                path:"additionalDetail"
                                            },
                                        }
                                    )
                                    .populate("Category")
                                    .populate("ratingAndReview")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                        },
                                    })
                                    .exec();
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`
            })
        }

        // return res
        return res.status(200).json({
            success:true,
            message:"Course details fetched sucessfully",
            data:courseDetails,
        })

    }catch(error){
        console.log(error)
        return res.status(200).json({
            sucecss:false,
            message:error.message
        })
    }
}