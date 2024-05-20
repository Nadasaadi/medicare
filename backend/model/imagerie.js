const db = require('../util/database');

class Imagerie {
  constructor(image, description, date_prise) {
    this.image = image;
    this.description = description;
    this.date_prise = date_prise;
  }

  static async getAllImagerie(id_patient) {
    const [imageries] = await db.query('SELECT * FROM imageriemedicale WHERE patient_id = ?', [id_patient]);
    return imageries.map(imagerie => ({
      id: imagerie.id,
      image: imagerie.image,
      description: imagerie.description,
      date_prise: imagerie.date_prise,
      patient_id: imagerie.patient_id
    }));
  }

  async save(id_patient) {
    const result = await db.query(
      'INSERT INTO imageriemedicale (image, description, date_prise, patient_id) VALUES (?, ?, ?, ?)',
      [this.image, this.description, this.date_prise, id_patient]
    );
    return result[0];
  }
}

module.exports = Imagerie;