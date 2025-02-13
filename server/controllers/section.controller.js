const Section = require('../models/section.model.js')
const Course = require('../models/course.model.js')

exports.createSection = async(req,res) => {
    try{
        // data fetch
        const {courseName,courseId} = req.body;

        // data validation
        if(!courseName || !courseId){
            return res.status(400).josn({
                success:false,
                message:"Missing Properties"
            })
        }

        // craete section
        const newSection = await Section.create({sectionName})

        // update course with section objectId
        const updateCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent:newSection._id
                                                }
                                            },
                                            {new:true}
            
                                     )
        // Use populate to replace sections/sub-sections both in the updateCourseDetails
        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updateCourseDetails
        })
    }catch(error){
        console.log("Error while creating new Course-section",error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.updateSection = async(req,res) => {
    try{
        // data input
        const {sectionName,sectionId} = req.body
        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).josn({
                success:false,
                message:"Missing Properties"
            })
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})
        // return response
        return res.status(200).json({
            success:true,
            message:"Section updated sucessfully"
        })
    }catch(error){
        console.log("Error while updating Course-section",error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteSection = async(req,res) => {
    try{
        // get id -- we are sending id in paraams
        const {sectionId} = req.params

        // findByIdAndDelete
        await Section.findByIdAndDelete(sectionId)

        // return response
        return res.status(200).json({
            success:true,
            message:"Section deleted sucessfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message
        })
    }
}