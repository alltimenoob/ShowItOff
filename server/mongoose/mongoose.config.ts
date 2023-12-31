
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function startMongoose(){
    try{
        mongoose.connect(process.env.DATABASE_URL)
    } catch(error){
        console.error("Something went wrong! Error -> "+error)
    }
    mongoose.connection.once('open', () => console.log(`Connected to mongo at ${process.env.DATABASE_URL}`));
}

export { startMongoose }