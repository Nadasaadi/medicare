const db = require("../util/database");

class TermCondition {
  constructor(texte, id) {
    this.texte = texte;
    this.id = id;
  }

  static async getTermCondition(texte) {
    return await db.execute( `SELECT * from term_condition ;` )
  }
  static async deleteTermCondition(id) {
    return await db.execute('DELETE FROM term_condition WHERE id = ?', [id]);
  }
  static async updateTermCondition(id,texte) {
      return await db.execute('UPDATE term_condition SET texte = ? WHERE id = ?', [texte, id]);
  }
  static async addTermCondition(texte) {
    return await db.execute('INSERT INTO term_condition (texte) VALUES (?)', [texte]);
  }
}

module.exports = TermCondition;