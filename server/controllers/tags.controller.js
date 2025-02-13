const Tag = require('../models/tag.model.js')

// create Tag ka handler function

exports.createTag = async(req,res) => {
    try{
        const {name,description} = req.body

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        // create entry in db
        const tagDetails = await Tag.create({
            name:name,
            description:description
        })

        return res.status(201).json({
            success:true,
            message:"Tag created successfully"
        })

    }catch(error){
        console.log("ERror while creating course tags",error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// get all tags
exports.showAllTags = async(req,res) => {
    try{
        const allTags = await Tag.find({},{name:true},{description:true})
        res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allTags
        })
    }catch(error){
        console.log("ERror while getting course tags",error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}