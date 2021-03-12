const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Mongo DB Connection Success');
    } catch (error) {
        console.log('Mongo DB Conection Failed');
        process.exit(1);
    };
};

module.exports = connectDB;