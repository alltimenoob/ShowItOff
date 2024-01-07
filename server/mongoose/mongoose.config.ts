import { MongoError } from "mongodb";

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function startMongoose(){
    try{
        mongoose.connect(process.env.DATABASE_URL).catch(()=>{
            console.log("Restart the server, add ip in atlas")
        })
    } catch(error){
        console.error("Something went wrong! Error -> "+error)
    }

    mongoose.connection.on('error',(error : MongoError)=>{ 
        console.log(error.errorLabels)
    })
    mongoose.connection.once('open', () => console.log(`Connected to mongo at ${process.env.DATABASE_URL}`));

}

export { startMongoose }