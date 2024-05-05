const express = require('express');
const router = express.Router();
const termconditionController = require('../controllers/TermCondition');

router.get('/', termconditionController.getAllTermCondition);
router.put('/', termconditionController.updateTermCondition);

module.exports = router;