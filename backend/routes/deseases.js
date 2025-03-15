const express = require('express')
const {
    createDesease,
    getDeseases, 
    getDesease,
    deleteDesease,
    updateDesease
} = require('../controllers/DeseaseController')


const router = express.Router()

//GET all Deseases
router.get('/', getDeseases);

//GET a single Desease
router.get('/:id', getDesease)

//POST a new Desease
router.post('/', createDesease)

//DELETE a Desease
router.delete('/:id', deleteDesease)

//UPDATE a Desease
router.patch('/:id', updateDesease)

module.exports = router