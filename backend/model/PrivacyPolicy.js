const db =  require("../util/database");
class PrivacyPolicy{
  
 
 
  constructor(texte){
      this.texte = texte;
  };

  static async getPrivacyPolicy(texte) {
    return await db.execute( `SELECT texte from Politique_de_confidentialité ;` )
}

static async updatePrivacyPolicy(texte) {
  return await db.execute('UPDATE Politique_de_confidentialité` SET texte = ? LIMIT 1', [texte]);
}


}
module.exports = PrivacyPolicy;