const db = require('../util/database');

const insertContactForm = ({ email, message }) => {

  // Requête d'insertion SQL
  
  db.execute(`
      INSERT INTO MessagesContact (Email, Message) VALUES( "${email}" , "${message}");
  `)
};


module.exports = {insertContactForm}