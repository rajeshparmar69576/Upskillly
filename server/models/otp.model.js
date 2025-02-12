const mongoose = require('mongoose')
const mailSender = require('../utils/mailsender.util')

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

//  a function to send verification email
async function sendVerificationEmail(email,otp) {
    try{
        const mailResponse = await mailSender(email,"Verifcation mail from upSkillly",otp)
        console.log("Email sent successfully",mailResponse)
    }catch(error){
        console.log("error while sending mail:",error.message)
        throw error;
    }
}

otpSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp)
    next()
})

module.exports = mongoose.model('Otp',otpSchema)

