const express = require('express');
const router = express.Router();
const imagerieController = require('../controllers/imagerie');
const multer = require('multer');
const path = require('path');

// Configuration du stockage pour les fichiers téléchargés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Création d'une instance de multer avec la configuration du stockage
const upload = multer({ storage });


// Route pour obtenir toutes les imageries d'un patient
router.get('/:id_patient', imagerieController.getAllImagerie);

// Route pour ajouter une nouvelle imagerie
router.post('/', upload.single('file'), imagerieController.addImagerie);

module.exports = router;