const User = require('../models/user.model.js')
const mailSender = require('../utils/mailsender.util.js')
const bcrypt = require('bcrypt')


// resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
    try{
        // get email from req ki body
        const {email} = req.body
        // validate email
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Entered email is not registered with us"
            })
        }
        // genearte token
        const token = crypto.randomUUID()
        // update user by addinhg token and expiration time
        const upadtedDetails = User.findOneAndUpdate({email},{token,restesPasswordExpires:Date.now() + 5*60*1000},{new:true})
        // create url
        const url = `http://localhost:3000/update-password/${token}`
        // send mail conatining url
        await mailSender(email,"Password reset Link",`Password reset reset Link : ${url}`)
        // return response
        return res.status(200).json({
            success:true,
            message:"Email send successfully please check email and change password"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting the password"
        })
    }
}

// resetPassword
exports.resetPassword = async(req,res)=>{
    try{
        // data fetch
        const {password,confirmPassword,token} = req.body;
        // validation
        if(password !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Password not matching"
            })
        }
        // get user detailss from db using token
        const userDetails = await User.findOne({token:token})
        // if no entry - Invalid token
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Token is Invalid"
            })
        }
        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token is Expired"
            })

        }
        // hash password
        const hashedPassword = await bcrypt.hash(password,10)

        // update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )
        // return response
        return res.status(200).json({
            success:true,
            message:"Rested password successfully"
        })

    }catch(error){
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Something went wrong while reseting the password"
            })

    }
}