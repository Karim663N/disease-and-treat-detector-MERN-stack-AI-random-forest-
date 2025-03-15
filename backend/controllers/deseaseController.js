const Desease = require('../models/deseaseModel')
const mongoose = require('mongoose')


// get all deseases
const getDeseases = async (req, res) => {
    const desease = await Desease.find({}).sort({createdAt: -1})

    res.status(200).json(deseases)
}

// get a single desease
const getDesease = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such desease'})
    }

    const desease = await Desease.findById(id)

    if (!desease) {
        return res.stataus(404).json({error: 'No such desease'})
    }

    res.status(200).json(desease)
}

// create a new desease
const createDesease = async (req, res) => {
    const {nameDesease, proofDesease} = req.body

    let emptyFields = []

    if(!nameDesease) {
        emptyFields.push('nameDesease')
    }
    if(!proofDesease) {
        emptyFields.push('proofDesease')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const desease= await Deseasedeseasecreate({nameDesease, proofDesease})
        res.status(200).json(desease)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a desease
const deleteDesease = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such desease'})
    }
    const desease = await Desease.findOneAndDelete({_id: id})

    if (!desease) {
        return res.stataus(404).json({error: 'No such desease'})
    }

    res.status(200).json(desease)
}

// update a desease
const updateDesease = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such desease'})
    }

    const desease = await Desease.findOneAndUpdate({_id: id}, {
        //will be spread into this object
        ...req.body
    })

    if (!desease) {
        return res.stataus(404).json({error: 'No such desease'})
    }

    res.status(200).json(desease)
}


module.exports = {
    getDeseases,
    getDesease,
    createDesease,
    deleteDesease,
    updateDesease
}