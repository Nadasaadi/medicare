const db = require("../util/database");

class Admin {
    constructor(email, password){
        this.email = email;
        this.password = password;
    };

    static async login({ email, password }) {
        try {
          const [[userData]] = await db.execute(
            `SELECT * FROM admin WHERE email = ? AND password = ?`,
            [email, password]
          );
          if (userData) {
            // Email et mot de passe valides, retourner les données de l'utilisateur
            return userData;
          } else {
            // Email ou mot de passe invalide, lever une erreur
            throw new Error("Email ou mot de passe invalide");
          }
        } catch (error) {
          throw error;
        }
      }
}

module.exports = Admin;
