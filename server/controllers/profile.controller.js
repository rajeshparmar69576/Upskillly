const Profile = require('../models/profile.model.js');
const User = require('../models/user.model.js')

exports.updateProfile = async(req,res) => {
    try{
        // get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body
        // get userId
        const id = req.user.id
        // validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }
        // find profile
        const userDetail = await User.findById(id)
        const profileId = userDetail.additionalDetail
        const profileDetails = await Profile.findById(profileId)
        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save()

        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated Successfully",
            profileDetails
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Profile not updated"
        })
    }
}


// deleteAccount
exports.deleteAccount = async(req,res) => {
    try{
        // get id
        const id = req.user.id
        // id validatuon
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).josn({
                success:false,
                message:"User not found",
            })
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetail})
        // delete user
        await User.findByIdAndDelete({_id:id})
        // return response
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User not deleted Sucessfully"
        })
    }
}



exports.getAllUserDetails = async(req,res) => {
    try{
        const id = req.user.id

        const userDEtails = await User.findById({id}.populate("additionalDetail").exec())

        return res.status(200).json({
            success:true,
            message:"User data fetched sueccesfully"
        })
    }catch(error){
        return res.status(500).json({
            sucecss:false,
            message:error.message
        })

    }
}