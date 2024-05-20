// Importation du module database depuis le répertoire util
const db = require("../util/database");

// Importation du modèle Vaccin depuis le répertoire model
const Vaccin = require('../model/vaccin');
exports.addVaccin = async (req, res) => {
    try {
      const { nom_vaccin, date_administration, remarques, id_patient } = req.body;
      const nouveauVaccin = new Vaccin(nom_vaccin, date_administration, remarques);
      await nouveauVaccin.addVaccin(id_patient);
      res.status(201).json({ message: 'Nouveau vaccin ajouté avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du vaccin :', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout du vaccin' });
    }
  };
// Contrôleur pour récupérer tous les vaccins associés à un patient spécifique
exports.getAllVaccins = async (req, res) => {
    try {
        // Extraction de l'identifiant du patient à partir des paramètres de la requête
        let { id_patient } = req.query;
        // Conversion de l'identifiant du patient en chaîne de caractères et suppression du caractère ":" 
        id_patient = id_patient.toString().replace(":", "");

        // Appel à la méthode statique getAllVaccins du modèle Vaccin pour récupérer les vaccins de patient 
        const vaccins = await Vaccin.getAllVaccins(id_patient);

        // Envoi d'une réponse HTTP avec le statut 200 et les données des vaccins au format JSON
        res.status(200).json(vaccins);
    } catch (error) {
        // Gestion des erreurs : en cas d'erreur, envoi d'une réponse HTTP avec le statut 500   
        console.error('Erreur lors de la récupération des vaccins :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des vaccins' });
    }
};
