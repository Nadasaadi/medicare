const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultation');

// Récupérer toutes les consultations d'un patient
router.get('/', consultationController.getAllConsultations);
// Récupérer toutes les consultations d'un médecin
router.get('/medecin', consultationController.getAllConsultationsForMedecin);
// Ajouter une nouvelle consultation
router.post('/add', consultationController.addConsultation);

module.exports = router;
