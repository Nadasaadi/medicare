// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const {submitContactForm} = require('../controllers/contactController');

// Route pour recevoir les données du formulaire de contact
router.post('/', submitContactForm);

module.exports = router;
