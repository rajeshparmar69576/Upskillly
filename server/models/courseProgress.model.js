const mongoose = require('mongoose')
const { type } = require('os')

const courseProgessSchema = new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    completedVidoes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'SubSection'
        }
    ]
})

module.exports = mongoose.model('courseProgess',courseProgessSchema)

