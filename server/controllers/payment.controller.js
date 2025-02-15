const { mongoose } = require('mongoose')
const {instance} = require('../config/razorpay.config.js')
const Course = require('../models/course.model.js')
const User = require('../models/user.model.js')
const mailSender = require('../utils/mailsender.util.js')
// cousreEnrollmentEmail


// capture the payment and initiate the Razorpay order
exports.capturePayment = async(req,res) => {
    try{
          // req.body courseId and userId
          const {courseId} = req.body;
          const userId = req.user.id
        // validate
        // valid course Id
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Please provide valid cousre Id"
            })
        }
        // valid course detail
        let course;
        try{
            course = await Course.findByID(courseId)
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:"Could not find the course"
                })
            }
        }catch(error){

        }
        // user alredy paid or not
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.include(uid)){
            return res.status(403).json({
                success:false,
                message:"Student is alredy enrolled"
            })
        }

        // order create
        const amount = course.price
        const currency = "INR";

        const options = {
            amount: amount + 100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId: courseId,
                userId
            }
        }

        try{
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options)
            console.log(paymentResponse)

            // return response 
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
            })
        }catch(error){
            console.log(error)
            res.json({
                success:false,
                message:"Could not initiate order",
            })
        }
        // return response
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}   

// verify signature of Razorpay Server

exports.verifySignature = async(req,res) => {
    const webhookSecret = "12345678";

    const signature = req.headers("x-razorpay-signature");

    const shasum = crypto.createHmac("sha256",webhookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is authorised")

        const {courseId,userId} = req.body.payload.payment.entity.notes

        try{
            // fulfil teh action

            // find the course and enroll the studnet in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true}
            )
            if(enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            }

            console.log(enrolledCourse)

            // find the student update the courseEnrooled
            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true}
            )

            console.log(enrolledStudent)

            // mail send krdo confirmation ki
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratutlations from CodeHelp",
                "Congratulations you are onboarded into new upSkillly Course"

            )

            console.log(emailResponse)
            return res.status(200).json({
                success:true,
                message:"Signature verified and Course Added",
            })
        }catch(error){
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Could not find the course"
        })
    }


    

}