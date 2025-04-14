const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email : {
        required: true,
        type: String
    },
    phone : {
        required: false,
        type: Number
    }

},{timestamps: true});

module.exports = mongoose.model('Data', dataSchema)