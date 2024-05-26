const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultation');

// Récupérer toutes les consultations d'un patient
router.get('/', consultationController.getAllConsultations);

// Ajouter une nouvelle consultation
router.post('/addConsultation', consultationController.addConsultation);

module.exports = router;
