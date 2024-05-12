const express  = require("express");

const router = express.Router();


const Maladie = require('../controllers/maladie');

// Route pour récupérer toutes les analyses sanguines
router.get('/', Maladie.getAllMaladies);

module.exports = router;