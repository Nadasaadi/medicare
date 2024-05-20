const db = require("../util/database");
const Allergie = require('../model/allergie');

exports.addAllergie = async (req, res) => {
    try {
      const { nom_allergie,  description, id_patient } = req.body;
      const nouveauAllergie = new Allergie(nom_allergie, description);
      await nouveauAllergie.addAllergie(id_patient);
      res.status(201).json({ message: 'Nouvelle allergie ajouté avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'allergie :', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout d\'allergie' });
    }
  };
exports.getAllAllergies = async (req, res) => {

    try {
        let {id_patient} = req.query;
        id_patient = id_patient.toString().replace(":", "")
        const allergies = await Allergie.getAllAllergies(id_patient);
        res.status(200).json(allergies);
    } catch (error) {
        console.error('Erreur lors de la récupération des allergies :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des allergies' });
    }
};
