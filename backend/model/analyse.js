//Importe le module database depuis le répertoire util.
const db =  require("../util/database");


class Analyse {
  // Définit le constructeur de la classe. Le constructeur est une méthode spéciale qui est appelée lors de la création d'une nouvelle instance de la classe
    constructor(date, type, marqueurSanguin, resultat, uniteMesure, autresInformations) {
      this.date = date;
      this.type = type;
      this.marqueurSanguin = marqueurSanguin;
      this.resultat = resultat;
      this.uniteMesure = uniteMesure;
      this.autresInformations = autresInformations;

    }
    static async getAllAnalyses(id_patient) {
      
      const [analyse] = await db.query('SELECT * FROM analyse WHERE id_patient = ?', [id_patient]);
      return analyse;
    }
    
}
  module.exports = Analyse;//Exporte la classe AnalyseSanguine afin qu'elle puisse être importée et utilisée dans d'autres fichiers de l'application.
  