const express  = require("express");

const router = express.Router();


const analyseSanguineController = require('../controllers/analyse');

// Route pour récupérer toutes les analyses sanguines
router.get('/', analyseSanguineController.getAllAnalysesSanguines);

module.exports = router;
