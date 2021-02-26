require('dotenv').config()
const mongoose = require('mongoose');

const dbname = process.env.DB_NAME;
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
mongoose.connect(`mongodb://${dbhost} : ${dbport}'/'${dbname}`, {useNewUrlParser: true},
    (err) => {
        if (!err) {
            console.log('Successfully Established Connection with MongoDB')
        } else {
            console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
        }
    });
module.exports = mongoose
