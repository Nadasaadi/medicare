const express = require('express');
const router = express.Router();
const termConditionController = require('../controllers/TermCondition');

router.get('/', termConditionController.getAllTermCondition);
router.put('/:id', termConditionController.updateTermCondition);
router.delete('/:id', termConditionController.deleteTermCondition);
router.post('/', termConditionController.addTermCondition);
module.exports = router;
