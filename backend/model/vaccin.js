// Importe le module database depuis le répertoire util.
const db = require("../util/database");

// Définit la classe Vaccin qui représente un vaccin administré à un patient.
class Vaccin {
  // Définit le constructeur de la classe. 
  constructor(nom_vaccin, date_administration, remarques) {
    this.nom_vaccin = nom_vaccin; // Nom du vaccin
    this.date_administration = date_administration; // Date d'administration du vaccin
    this.remarques = remarques; // Remarques sur le vaccin
  }
   
  // Méthode statique qui récupère tous les vaccins associés à un patient donné.
  static async getAllVaccins(id_patient) {
    // Exécute une requête SQL pour récupérer tous les vaccins associés à un patient spécifique depuis la bdd
    const [vaccin] = await db.query('SELECT * FROM vaccin WHERE patient_id = ?', [id_patient]);
    return vaccin; // Retourne les résultats de la requête SQL.
  } 
  async addVaccin(id_patient) {
    const query = 'INSERT INTO vaccin (nom_vaccin, date_administration, remarques, patient_id) VALUES (?, ?, ?, ?)';
    const values = [this.nom_vaccin, this.date_administration, this.remarques, id_patient];
    await db.query(query, values);
  }
}
// Exporte la classe Vaccin afin qu'elle puisse être importée et utilisée dans d'autres fichiers de l'application.
module.exports = Vaccin;
