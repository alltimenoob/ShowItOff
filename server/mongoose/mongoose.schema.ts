const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        unique : true,
        required : true
    },
    name : {
        type: String
    },
    password : {
        type: String,
        required : true
    },
}, { timestamps : true})

const documentSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    filename : {
        type : String,
        unique : true,
        required : true
    }
},{ timestamps : true })

export { userSchema, documentSchema }