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

exports.getNomAnalyseById = async (req, res) => {
  try {
    const { id } = req.params;
    const nomAnalyse = await req.app.get('req').get('res')('nomAnalyse', id);
    res.status(200).json(nomAnalyse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.ajouterAnalyse = async (req, res) => {
  const { type_analyse, date_analyse, id_nom_analyse, marquer, resultat, unite, norme, autres_informations } = req.body;
  const { id_patient } = req.params;

  try {
    const nouvelleAnalyse = new Analyse(type_analyse, date_analyse, id_patient, id_nom_analyse, marquer, resultat, unite, norme, autres_informations);
    console.log(nouvelleAnalyse)
    await nouvelleAnalyse.addAnalyse();
    res.status(201).json({ message: 'Analyse ajoutée avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'analyse :', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'analyse' });
  }
};

exports.getNomAnalyses = async (req, res) => {
  try {
    const nomAnalyses = await Analyse.getNomAnalyses();
    res.status(200).json(nomAnalyses);
  } catch (error) {
    console.error('Erreur lors de la récupération des noms d\'analyse :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des noms d\'analyse' });
  }
};

exports.addNomAnalyse = async (req, res) => {
  const { type } = req.body;

  try {
    await Analyse.addNomAnalyse(type);
    res.status(201).json({ message: 'Nom d\'analyse ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du nom d\'analyse :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
