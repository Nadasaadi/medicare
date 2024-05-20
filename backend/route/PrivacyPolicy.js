const express = require('express');
const router = express.Router();
const privacyPolicyController = require('../controllers/privacyPolicyController');

router.get('/', privacyPolicyController.getAllPrivacyPolicy);
router.put('/:id', privacyPolicyController.updatePrivacyPolicy);
router.delete('/:id', privacyPolicyController.deletePrivacyPolicy);
router.post('/', privacyPolicyController.addPrivacyPolicy);

module.exports = router;