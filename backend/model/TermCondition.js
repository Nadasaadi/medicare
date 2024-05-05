const db = require("../util/database");

class TermCondition {
  constructor(texte) {
    this.texte = texte;
  };

  static async getTermCondition(texte) {
    return await db.execute( `SELECT texte from term_condition ;` )
  }

  static async updateTermCondition(texte) {
    return await db.execute('UPDATE term_condition` SET texte = ? LIMIT 1', [texte]);
  }
}

module.exports = TermCondition;