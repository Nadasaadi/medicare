const TermCondition = require('../model/TermCondition');
const db = require("../util/database");

const TermConditionController = {
  getAllTermCondition: async (req, res, next) => {
    try {
      const [termCondition] = await TermCondition.getTermCondition();
      res.json(termCondition);
    } catch (error) {
      next(error);
    }
  },

  updateTermCondition: async (req, res, next) => {
    try {
      const { texte } = req.body;
      await TermCondition.updateTermCondition(texte);
      res.json({ message: 'Termes et conditions mis à jour avec succès' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = TermConditionController;