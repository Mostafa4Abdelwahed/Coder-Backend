const mongoose = require('mongoose')

module.exports = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected Database Successfully ! ');
    } catch (error) {
        console.log('Connection Failed To MondgoDB!', error);
    }
}