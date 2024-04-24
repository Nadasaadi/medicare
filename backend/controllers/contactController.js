const db = require('../util/database');

const {insertContactForm} = require("../model/MessagesContact")

const submitContactForm = (req, res) => {
  const { email, message } = req.body
  insertContactForm({ email, message })
  console.log(req.body)
} 



module.exports = {submitContactForm}
// exports.submitContactForm = (req, res) => {
//   const { userType, email, message } = req.body;

//   let patientId = null;
//   let medecinId = null;
//   let adminId = null;

//   // Déterminez quel champ ID_Patient, ID_Medecin ou ID_Admin doit être rempli
//   switch (userType) {
//     case 'patient':
//       patientId = req.body.ID_Patient;
//       break;
//     case 'medecin':
//       medecinId = req.body.ID_Medecin;
//       break;
//     case 'visiteur':
//       adminId = req.body.ID_Admin;
//       break;
//     default:
//       // Gérer une erreur si aucun type d'utilisateur n'est sélectionné
//       res.status(400).json({ message: 'Veuillez sélectionner un type d\'utilisateur.' });
//       return;
//   }

//   // Requête d'insertion SQL
//   const insertQuery = `INSERT INTO MessagesContact (ID_Patient, ID_Medecin, ID_Admin, Email, Message) VALUES (?, ?, ?, ?, ?)`;

//   // Exécutez la requête d'insertion en utilisant la connexion à la base de données
//   db.query(insertQuery, [patientId, medecinId, adminId, email, message], (error, results, fields) => {
//     if (error) {
//       console.error('Erreur lors de l\'insertion des données dans la base de données :', error);
//       res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'enregistrement des données.' });
//     } else {
//       console.log('Données enregistrées avec succès.');
//       res.status(200).json({ message: 'Données enregistrées avec succès.' });
//     }
//   });
// };
