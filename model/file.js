const mongoose = require('mongoose')

const fileShcemas = mongoose.Schema({
    name: {
        type: String
    },
    cat: {
        type: String
    },
    path: {
        type: String
    }
})

module.exports = mongoose.model('File', fileShcemas);
