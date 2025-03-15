const express = require('express')
const {
    createTreat,
    getTreats, 
    getTreat,
    deleteTreat,
    updateTreat
} = require('../controllers/treatController')


const router = express.Router()

//GET all Treats
router.get('/', getTreats);

//GET a single Treat
router.get('/:treatName', getTreat);

//POST a new Treat
router.post('/', createTreat)

//DELETE a Treat
router.delete('/:id', deleteTreat)

//UPDATE a Treat
router.patch('/:id', updateTreat)

module.exports = router