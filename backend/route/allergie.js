const express  = require("express");

const router = express.Router();


const Allergie = require('../controllers/allergie');

// Route pour récupérer toutes les analyses sanguines
router.get('/', Allergie.getAllAllergies);
router.post('/add', Allergie.addAllergie);
module.exports = router;