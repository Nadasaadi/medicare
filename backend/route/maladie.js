const express  = require("express");

const router = express.Router();


const Maladie = require('../controllers/maladie');

// Route pour récupérer toutes les analyses sanguines
router.get('/', Maladie.getAllMaladies);
// Route pour ajouter une nouvele maladie chronique
router.post('/add', Maladie.addMaladie);
module.exports = router;