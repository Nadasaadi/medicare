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
      const { texte } = req.body;
      await PrivacyPolicy.updatePrivacyPolicy(texte);
      res.json({ message: 'Politique de confidentialité mise à jour avec succès' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = PrivacyPolicyController;