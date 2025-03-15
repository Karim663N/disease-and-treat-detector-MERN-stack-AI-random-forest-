const mongoose = require('mongoose')

const Schema = mongoose.Schema

//model will create a structure of the document to save to the collection in database

const deseaseSchema = new Schema({
    nameDesease: {
        type: String,
        required: true
    },
    proofDesease: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Desease', deseaseSchema)
