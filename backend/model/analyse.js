const db = require("../util/database");

class Analyse {
  constructor(date, type, marqueurSanguin, resultat, uniteMesure, autresInformations) {
    this.date = date;
    this.type = type;
    this.marqueurSanguin = marqueurSanguin;
    this.resultat = resultat;
    this.uniteMesure = uniteMesure;
    this.autresInformations = autresInformations;
  }

  static async getAllAnalyses(id_patient) {
    const [analyses] = await db.query(`
      SELECT a.*, n.type AS nom_analyse
      FROM analyse a
      JOIN nom_analyse n ON a.id_nom_analyse = n.id
      WHERE a.id_patient = ?
    `, [id_patient]);
    return analyses;
  }
  static async getNomAnalyseById(id) {
    const nomAnalyse = await db.query(`
      SELECT type
      FROM nom_analyse
      WHERE id = ?
    `, [id]);

    return nomAnalyse.type;
  }
  
}

module.exports = Analyse;