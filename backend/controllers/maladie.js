const db = require("../util/database");
const  Maladie = require('../model/maladie');

exports.addMaladie = async (req, res) => {
    try {
      const { nom_maladie,description , id_patient } = req.body;
      const nouveauMaladie = new Maladie(nom_maladie,description);
      await nouveauMaladie.addMaladie(id_patient);
      res.status(201).json({ message: 'Nouvelle maladie chronique ajouté avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du maladie :', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout du maaldie' });
    }
  };
exports.getAllMaladies = async (req, res) => {

    try {
        let {id_patient} = req.query;
        id_patient = id_patient.toString().replace(":", "")
        const maladies = await Maladie.getAllMaladies(id_patient);
        res.status(200).json(maladies);
    } catch (error) {
        console.error('Erreur lors de la récupération des maladies chronique :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des maladies chronique' });
    }
};
