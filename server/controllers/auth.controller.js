const User = require("../models/user.model.js");
const Otp = require("../models/otp.model.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/mailsender.util.js')
const optGenerator = require("otp-generator");
require('dotenv').config()

// sendOtp
exports.sendOtp = async (req, res) => {
  try {
    // fetch email from req.body
    const { email } = req.body;

    // Check if user already exist
    const checkUserPresent = await User.findOne({ email });

    // if user already exist, then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // generate otp
    var otp = optGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp genearted successfully", otp);

    // check unique otp or not
    const result = await Otp.findOne({ otp: otp });

    while (result) {
      otp = optGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp: otp });
    }

    const optPayload = { email, otp };

    // create an entry for otp
    const otpBody = await Otp.create(optPayload);
    console.log(otpBody);

    // return response successful
    res.status(200).json({
      success: true,
      message: "Otp sent Successfully",
      otp,
    });
  } catch (error) {
    console.log("Error while generating Otp for verification", error.message);
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// signUp
exports.signUp = async (req, res) => {
  try {
    // data fetch from req ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // validate krlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All feilds are required",
      });
    }
    // 2 password compare krlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "password & confirmPassword value doesnot match please try again",
      });
    }
    // check user alraedy exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // find most recent otp stored for the user
    const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);

    // validate OTP
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Otp not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Otp not matching",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // entry create in DB
    const profileDetails = await profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // return res
    res.status(200).json({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
    console.log("User cannot be regsietred please try again", error.message);
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
exports.login = async (req,res) => {
    try{
        // get data from user ki body
        const {email,password} = req.body;

        // validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All feilds are required"
            })
        }
        // user check kro exist or not
        const user = await User.findOne({email}).populate(additionalDetails)
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered,please signup firts"
            })
        }

        // generate JWT, token After password matching
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'2h',
        });

        user.token = token;
        user.password = undefined

        // create cookie and send response
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie('token',token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged in successfully",
        })

    }catch(error){
        console.log("Error while siging in", error.message);
        return res.status(501).json({
            success: false,
            message: error.message,
        });
    }
}

// changePassword
exports.changePassword = async (req,res) => {
    try{
      // get data from req body
      // get oldPassword, newPassword , confirmNewPassword
      const {email,newPassword,confirmPassword} = req.body


      
      // validation
      if(!newPassword || !confirmPassword || !email){
        return res.status(400).json({
        success:false,
        message:"All feilds are required"
        })
      }


      // checking if user exists or not
      const user = await User.findOne({email})

      if(!user){
        return res.status(404).json({
          success:false,
          message:"User does not exist"
        })
      }

      // getting oldPassword
      const oldPassword = user.password

      // validating odlPassword
      const compareOldPass = await bcrypt.compare(oldPassword,user.password)

      if(!compareOldPass){
        return res.status(403).json({
          success:false,
          message:"Invalid credentials"
        })
      }

      // Check if both password is correct
      if(newPassword !== confirmPassword){
        return res.status(400).json({
        success: false,
        message:"password & confirmPassword value doesnot match please try again",
        });
      }

      // hashing password before saving it
      const hashedPassword = await bcrypt.hash(newPassword,10)

      // update password in DB
      const userId = user._id
      await User.findByIdAndUpdate(userId,{password:hashedPassword})

      // send mail - Password updated
      const {title,body} = req.body
      await sendMail(email,title,body)

      // return response
      res.status(200).json({
        success:true,
        message:"email sended successfully"
      })
    }catch(error){
      console.log("Error while siging in", error.message);
      return res.status(500).json({
          success: false,
          message: error.message,
      });
    }
}
