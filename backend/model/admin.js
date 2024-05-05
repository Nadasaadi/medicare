const db = require("../util/database");

class Admin {
    constructor(email, password){
        this.email = email;
        this.password = password;
    };

    static async login({email, password}) {
        try {
            const [[userData]] = await db.execute(`SELECT * FROM admin WHERE email = ?`, [email]);
            console.log(userData);
            // Retourner les données de l'utilisateur si les informations d'identification sont valides
            return userData;
        } catch (error) {
            throw error; // Propager l'erreur vers le code appelant
        }
    }
}

module.exports = Admin;
