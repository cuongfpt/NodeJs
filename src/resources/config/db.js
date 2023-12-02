const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/NodeJs');
        console.log("Connect succeeded");
    } catch (error) {
        console.log('Connect failure!!!');  
    }
   
}

module.exports = {connect};