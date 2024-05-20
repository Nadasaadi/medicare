const { deletePrivacyPolicy } = require("../controllers/privacyPolicyController");
const db =  require("../util/database");
class PrivacyPolicy{
  
 
 
  constructor(texte){
      this.texte = texte;
  };

  static async getPrivacyPolicy(texte) {
    return await db.execute( `SELECT * from Politique_de_confidentialité ;` )
}
static async deletePrivacyPolicy(id) {
  return await db.execute('DELETE FROM Politique_de_confidentialité WHERE id = ?', [id]);
}
static async updatePrivacyPolicy(id,texte) {
    return await db.execute('UPDATE Politique_de_confidentialité SET texte = ? WHERE id = ?', [texte, id]);
}
static async addPrivacyPolicy(texte) {
  return await db.execute('INSERT INTO Politique_de_confidentialité (texte) VALUES (?)', [texte]);
}


}
module.exports = PrivacyPolicy;