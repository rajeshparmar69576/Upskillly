const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user.model.js')

// auth
exports.auth = async (req,res,next) => {
    try{
        // extract token
        const token = req.cookies.token
                        || req.body.token
                        || req.header['Authorization'].replace("Bearer","")

        // token missing return
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Auth token is missing"
            })
        }

        // verify token 
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode


        }catch(error){
            return res.status(401).json({
                sucecss:false,
                message:"Token is invalid"
            })
        }

    }catch(error){
        return res.status(500).json({
            sucecss:false,
            message:"something went wrong while validating the token"
        })
    }
}

// isStudent
exports.isStudent = async(req,res,next) => {
    try{
        if(req.User.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students only"
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified please try again"
        })
    }
}

// isInstructor
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.User.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for insructor only"
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified please try again"
        })
    }
}

// isAdmin
exports.isAdmin= async(req,res,next) => {
    try{
        if(req.User.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route fro Admin only"
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified pleqase try again"
        })
    }
}