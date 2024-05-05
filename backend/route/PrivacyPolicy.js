const express = require('express');
const router = express.Router();
const privacyPolicyController = require('../controllers/privacyPolicyController');

router.get('/', privacyPolicyController.getAllPrivacyPolicy);
router.put('/', privacyPolicyController.updatePrivacyPolicy);

module.exports = router;