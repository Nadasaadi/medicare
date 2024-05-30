const db = require("../util/database");

class Analyse {
  constructor(type_analyse, date_analyse, id_patient, id_nom_analyse, marquer, resultat, unite, norme, autres_informations) {
    this.type_analyse = type_analyse;
    this.date_analyse = date_analyse;
    this.id_patient = id_patient;
    this.id_nom_analyse = id_nom_analyse;
    this.marquer = marquer;
    this.resultat = resultat;
    this.unite = unite;
    this.norme = norme;
    this.autres_informations = autres_informations;
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

  async addAnalyse() {
    const query = `
      INSERT INTO analyse 
      (type_analyse, date_analyse, id_patient, id_nom_analyse, marquer, resultat, unite, norme, autres_informations) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      this.type_analyse, 
      this.date_analyse, 
      this.id_patient, 
      this.id_nom_analyse, 
      this.marquer, 
      this.resultat, 
      this.unite, 
      this.norme, 
      this.autres_informations
    ];
    await db.query(query, values);
  }

  static async getNomAnalyses() {
    const [nomAnalyses] = await db.query(`
      SELECT id, type
      FROM nom_analyse
    `);
    return nomAnalyses;
  }

  static async addNomAnalyse(type) {
    const query = 'INSERT INTO nom_analyse (type) VALUES (?)';
    await db.query(query, [type]);
  }
}

module.exports = Analyse;
