const db = require("../util/database");

class Consultation {
  constructor(date_consultation, conclusion) {
    this.date_consultation = date_consultation;
    this.conclusion = conclusion;
  }

  static async getAllConsultations(id_patient) {
    const query = `
      SELECT consultation.*, 
             medecin.nom AS medecin_nom, 
             medecin.prenom AS medecin_prenom, 
             medecin.email AS medecin_email, 
             medecin.specialite AS medecin_specialite, 
             medecin.adresse AS medecin_adresse, 
             medecin.numero_tel AS medecin_numero_tel
      FROM consultation
      INNER JOIN medecin ON consultation.id_medecin = medecin.id_medecin
      WHERE consultation.id_patient = ?
    `;
    const [consultations] = await db.query(query, [id_patient]);
    return consultations;
  }

  async addConsultation(id_patient, id_medecin) {
    const query =
      'INSERT INTO consultation (id_patient, id_medecin, date_consultation, conclusion) VALUES (?, ?, ?, ?)';
    const values = [
      id_patient,
      id_medecin,
      this.date_consultation,
      this.conclusion,
    ];
    try {
      await db.query(query, values);
    } catch (error) {
      throw new Error(`Unable to add consultation: ${error.message}`);
    }
  }
}

module.exports = Consultation;
