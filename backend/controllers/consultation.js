const Consultation = require('../model/consultation');

exports.getAllConsultations = async (req, res) => {
  try {
    let { id_patient } = req.query;
    id_patient = id_patient.toString().replace(":", "");
    const consultations = await Consultation.getAllConsultations(id_patient);
    res.status(200).json(consultations);
    console.log(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllConsultationsForMedecin = async (req, res) => {
  try {
    let { id_medecin } = req.query;
    id_medecin = id_medecin.toString().replace(":", "");
    const consultations = await Consultation.getAllConsultationsForMedecin(id_medecin);
    res.status(200).json(consultations);
    console.log(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addConsultation = async (req, res) => {
  try {
    const { id_patient, id_medecin, date_consultation, conclusion } = req.body;

    // Validation des données
   // if (!id_patient || !id_medecin || !date_consultation || !conclusion) {
     // return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    //}

    const newConsultation = new Consultation(date_consultation, conclusion);
    await newConsultation.addConsultation(id_patient, id_medecin);
    res.status(201).json({ message: 'Consultation ajoutée avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la consultation :', error);
    res.status(500).json({ message: error.message });
  }
};
