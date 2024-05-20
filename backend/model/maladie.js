//Importe le module database depuis le répertoire util.
const db =  require("../util/database");


class Maladie {
  // Définit le constructeur de la classe. Le constructeur est une méthode spéciale qui est appelée lors de la création d'une nouvelle instance de la classe
    constructor(nom_maladie,description) {
      this.nom_maladie = nom_maladie;
      this.description= description;
    }
   
    static async getAllMaladies(id_patient) {
      const [maladie] = await db.query('SELECT * FROM maladiechronique WHERE patient_id = ?', [id_patient]);
      return maladie;
    }
    async addMaladie(id_patient) {
      const query = 'INSERT INTO  maladiechronique (nom_maladie,description, patient_id) VALUES (?, ?, ?)';
      const values = [this.nom_maladie,this.description, id_patient];
      await db.query(query, values);
    }
    
}
  module.exports = Maladie;