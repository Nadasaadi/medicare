const TermCondition = require('../model/TermCondition');
const db = require("../util/database");

const TermConditionController = {
  getAllTermCondition: async (req, res, next) => {
    try {
      const [termCondition] = await TermCondition.getTermCondition();
      console.log([termCondition])
      res.json(termCondition);
    } catch (error) {
      next(error);
    }
  },    
  updateTermCondition: async (req, res, next) => {
    try {
      const { id } = req.params; // Récupérer l'id depuis les paramètres de la requête
      const { texte } = req.body; // Récupérer le nouveau texte depuis le corps de la requête
  
      // Appeler la méthode updateTermCondition avec l'id et le nouveau texte
      const result = await TermCondition.updateTermCondition(id, texte);
  
      if (result.affectedRows === 0) {
        // Aucun enregistrement n'a été mis à jour
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
  
      res.json({ message: 'Termes et conditions mis à jour avec succès' });
    } catch (error) {
      next(error);
    }
  },
  addTermCondition: async (req, res, next) => {
    try {
      const { texte } = req.body;
      const [result] = await TermCondition.addTermCondition(texte);
      if (result.affectedRows > 0) {
        res.status(201).json({ message: 'Termes et conditions ajoutés avec succès' });
      } else {
        res.status(500).json({ error: 'Erreur lors de l\'ajout des termes et conditions' });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteTermCondition: async (req, res, next) => {
    try {
      const { id } = req.params; // Récupérer l'id depuis les paramètres de la requête
  
      // Appeler la méthode deleteTermCondition avec l'id
      const [result] = await TermCondition.deleteTermCondition(id);
  
      if (result.affectedRows === 0) {
        // Aucun enregistrement n'a été supprimé
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
  
      res.json({ message: 'Termes et conditions supprimés avec succès' });
    } catch (error) {
      next(error);
    }
  }
};


module.exports = TermConditionController;