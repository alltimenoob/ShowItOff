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
    title : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    tags : {
        type : [String]
    },
    filename : {
        type : String,
        unique : true,
        required : true
    },
    preview : {
        type : String,
        required : true
    }
},{ timestamps : true })

documentSchema.index({title : 1 , email : 1} , { name: 'unique_index_name',unique : true })

export { userSchema, documentSchema }