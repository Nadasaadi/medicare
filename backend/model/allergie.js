//Importe le module database depuis le répertoire util.
const db =  require("../util/database");


class Allergie {
  // Définit le constructeur de la classe. Le constructeur est une méthode spéciale qui est appelée lors de la création d'une nouvelle instance de la classe
    constructor(nom_allergie,description) {
      this.nom_allergie = nom_allergie;
      this.description= description;
    }
   
    static async getAllAllergies(id_patient) {
      const [allergie] = await db.query('SELECT * FROM allergie WHERE patient_id = ?', [id_patient]);
      return allergie;
    }
    
    async addAllergie(id_patient) {
      const query = 'INSERT INTO allergie (nom_allergie, description, patient_id) VALUES (?, ?, ?)';
      const values = [this.nom_allergie,  this.description, id_patient];
      await db.query(query, values);
    }
  }
  module.exports = Allergie;//Exporte la classe vaccin afin qu'elle puisse être importée et utilisée dans d'autres fichiers de l'application.
  