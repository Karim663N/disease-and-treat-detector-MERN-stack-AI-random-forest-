const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const treatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    typeTreat: { // Changed to match your data
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Treat', treatSchema);