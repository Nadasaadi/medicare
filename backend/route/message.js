const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/message');

// Route pour récupérer tous les messages
router.get('/', messagesController.getAllMessages);
// Route pour supprimer un message
router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
