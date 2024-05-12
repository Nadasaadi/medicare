//Importe le module database depuis le répertoire util.
const db =  require("../util/database");


class Vaccin {
  // Définit le constructeur de la classe. Le constructeur est une méthode spéciale qui est appelée lors de la création d'une nouvelle instance de la classe
    constructor(nom_vaccin,date_administration,remarques) {
      this.nom_vaccin = nom_vaccin;
      this.date_administration = date_administration;
      this.remarques= remarques;
    }
   
    static async getAllVaccins(id_patient) {
      const [vaccin] = await db.query('SELECT * FROM vaccin WHERE patient_id = ?', [id_patient]);
      return vaccin;
    }
    
}
  module.exports = Vaccin;//Exporte la classe vaccin afin qu'elle puisse être importée et utilisée dans d'autres fichiers de l'application.
  