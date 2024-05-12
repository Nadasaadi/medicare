const express  = require("express");

const router = express.Router();


const Vaccin = require('../controllers/vaccin');

// Route pour récupérer toutes les analyses sanguines
router.get('/', Vaccin.getAllVaccins);

module.exports = router;