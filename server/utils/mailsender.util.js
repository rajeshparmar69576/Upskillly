const nodemailer = require('nodemailer')

const mailSender = async(email,title,body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                password:process.env.MAIL_PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from:"upSkillly || 100xDev - by Rajesh",
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,

        })
        console.log(info)
        return info;

    }catch(error){
        console.log("Error while sending mail",error.message)
    }

}

module.exports = mailSender;