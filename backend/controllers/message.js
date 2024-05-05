const Message = require('../model/massage');

const messagesController = {
  getAllMessages: async (req, res, next) => {
    try {
      const messages = await Message.getAllMessages(); // Utiliser le modèle Message
      res.json(messages);
    } catch (error) {
      next(error);
    }
  },
  deleteMessage: async (req, res, next) => {
    try {
      const messageId = req.params.id;
      const isDeleted = await Message.deleteMessage(messageId);
      if (isDeleted) {
        res.status(200).json({ message: 'Message deleted successfully' });
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = messagesController;
