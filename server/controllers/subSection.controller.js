const SubSection = require('../models/subSection.model.js')
const Section = require('../models/section.model.js')
const {uploadImageToCloudinary} = require('../utils/imageUploader.js')

// create subsection
exports.createSubSection = async(req,res) => {
    try{
        // fetch data from req ki body
        const {sectionId,title,timeDuration,description} = req.body
        // extract file video
        const video = req.files.videoFiles
        // validation
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"all feilds are required"
            })
        }
        // upload video to cllodinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
        // create sub section
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl:uploadDetails.secure_url,
        })
        // update section with this sub-section id
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                            {$push:{
                                                                subsection:subSectionDetails._id,
                                                            }},
                                                            {new:true}
        )
        // return response
        return res.status(200).json({
            sucess:true,
            message:"sub section created sucessfully",
            updatedSection
        })
    }catch(error){
        console.log("Error while getting courses",error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Hw: updatedSubSection

// Hw: delete