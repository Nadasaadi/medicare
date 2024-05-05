const db = require('../util/database');

class Message {
  constructor(email, message, dateEnvoi) {
    this.email = email;
    this.message = message;
    this.dateEnvoi = dateEnvoi;
  }
  static async deleteMessage(messageId) {
    try {
      const [result] = await db.execute('DELETE FROM MessagesContact WHERE ID = ?', [messageId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
  static async getAllMessages() {
    try {
      const [messages] = await db.execute('SELECT * FROM MessagesContact');
      console.log(messages);
      return messages;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Message;
