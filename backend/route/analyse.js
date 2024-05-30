const express  = require("express");

const router = express.Router();


const analyseSanguineController = require('../controllers/analyse');

router.get('/', analyseSanguineController.getAllAnalyses);
router.get('/nomAnalyses', analyseSanguineController.getNomAnalyses);
router.post('/addnomAnalyses', analyseSanguineController.addNomAnalyse);
router.post('/ajouter/:id_patient', analyseSanguineController.ajouterAnalyse);

module.exports = router;