const Treat = require('../models/treatModel')
const mongoose = require('mongoose')

// get all treats
const getTreats = async (req, res) => {
    const treats = await Treat.find({}).sort({ createdAt: -1 })
    res.status(200).json(treats)
}

// get a single Treat
const getTreat = async (req, res) => {
    const { treatName } = req.params; // Extract treatName from request params

    try {
        const treat = await Treat.findOne({ typeTreat: treatName }); // Find by typeTreat

        if (!treat) {
            return res.status(404).json({ error: 'No such treat' });
        }

        res.status(200).json(treat);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// create a new treat
const createTreat = async (req, res) => {
    const { name, typeTreat, description } = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!typeTreat) {
        emptyFields.push('typeTreat')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const treat = await Treat.create({ name, typeTreat, description })
        res.status(200).json(treat)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a treat
const deleteTreat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such treat' })
    }
    const treat = await Treat.findOneAndDelete({ _id: id })

    if (!treat) {
        return res.status(404).json({ error: 'No such treat' })
    }

    res.status(200).json(treat)
}

// update a treat
const updateTreat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such treat' })
    }

    const treat = await Treat.findOneAndUpdate({ _id: id }, {
        //will be spread into this object
        ...req.body
    })

    if (!treat) {
        return res.status(404).json({ error: 'No such treat' })
    }

    res.status(200).json(treat)
}

module.exports = {
    getTreats,
    getTreat,
    createTreat,
    deleteTreat,
    updateTreat
}
