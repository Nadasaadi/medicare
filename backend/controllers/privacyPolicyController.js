const PrivacyPolicy = require('../model/PrivacyPolicy');
const db = require("../util/database");

const PrivacyPolicyController = {
  getAllPrivacyPolicy: async (req, res, next) => {
    try {
      const [privacyPolicy] = await PrivacyPolicy.getPrivacyPolicy();
      res.json(privacyPolicy);
    } catch (error) {
      next(error);
    }
  },
  updatePrivacyPolicy: async (req, res, next) => {
    try {
      const { id } = req.params; // Récupérer l'id depuis les paramètres de la requête
      const { texte } = req.body; // Récupérer le nouveau texte depuis le corps de la requête
  
      // Appeler la méthode updateTermCondition avec l'id et le nouveau texte
      const result = await PrivacyPolicy.updatePrivacyPolicy(id, texte);
  
      if (result.affectedRows === 0) {
        // Aucun enregistrement n'a été mis à jour
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
  
      res.json({ message: 'politique de confidentialité mis à jour avec succès' });
    } catch (error) {
      next(error);
    }
  },
  addPrivacyPolicy: async (req, res, next) => {
    try {
      const { texte } = req.body;
      const [result] = await PrivacyPolicy.addPrivacyPolicy(texte);
      if (result.affectedRows > 0) {
        res.status(201).json({ message: 'politique de confidentialité ajoutés avec succès' });
      } else {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de politique de confidentialité' });
      }
    } catch (error) {
      next(error);
    }
  },

  deletePrivacyPolicy: async (req, res, next) => {
    try {
      const { id } = req.params; // Récupérer l'id depuis les paramètres de la requête
  
      // Appeler la méthode deleteTermCondition avec l'id
      const [result] = await PrivacyPolicy.deletePrivacyPolicy(id);
  
      if (result.affectedRows === 0) {
        // Aucun enregistrement n'a été supprimé
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
  
      res.json({ message: 'politique de confidentialité supprimés avec succès' });
    } catch (error) {
      next(error);
    }
  }
};
 

module.exports = PrivacyPolicyController;