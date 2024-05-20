const db = require("../util/database");
const Analyse = require('../model/analyse');


exports.getAllAnalyses = async (req, res) => {
  try {
    let { id_patient } = req.query;
    id_patient = id_patient.toString().replace(":", "");
    const analyses = await Analyse.getAllAnalyses(id_patient);
    res.status(200).json(analyses);
  } catch (error) {
    console.error('Erreur lors de la récupération des analyses sanguines:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des analyses sanguines' });
  }
};
