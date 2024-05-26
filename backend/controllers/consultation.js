const Consultation = require('../model/consultation');

exports.getAllConsultations = async (req, res) => {

  try {
    let {id_patient} = req.query;
    id_patient = id_patient.toString().replace(":", "")
    const consultations = await Consultation.getAllConsultations(id_patient);
    res.status(200).json(consultations);
    console.log(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addConsultation = async (req, res) => {
  const { id_patient, id_medecin, date_consultation, conclusion } = req.body;
  const newConsultation = new Consultation(date_consultation, conclusion);
  try {
    await newConsultation.addConsultation(id_patient, id_medecin);
    res.status(201).json({ message: 'Consultation added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
