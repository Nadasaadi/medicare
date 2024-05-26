const bcrypt = require("bcrypt");
const db =  require("../util/database");



class Medecin {
    constructor(email, password, nom, prenom, specialite,  adresse, numero_tel){
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.specialite = specialite;
        this.adresse = adresse;
        this.numero_tel = numero_tel;
    };
   
   
    static async testExistEmail(email) {
        return await db.execute( `SELECT email from medecin WHERE email = "${email}" ;` )
    }
    

    static async loginM({email, password}) {
        const [[userData]] = await db.execute( `SELECT * from medecin WHERE email = "${email}";` );
        if (!userData) {
            throw Error("invalid email")
        }
        const hashedPassword = userData.password; // Récupérer le mot de passe hashé de la base de données
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) {
            throw Error("invalid password")
        }
        // Retourner les données de l'utilisateur si le mot de passe est correct
        return userData;
    }
    static async signupM({ email, password, nom, prenom, specialite, adresse, numero_tel }) {{
      
            const [[existEmail]] = await Medecin.testExistEmail(email);
            if(existEmail){
                throw Error("email alredy exist");
            }
            return await db.execute( `  INSERT INTO medecin (email, password, nom, prenom, specialite, adresse, numero_tel) VALUES ("${email}", "${password}", "${nom}", "${prenom}",  "${specialite}", "${adresse}", "${numero_tel}");` );
        }
    }
    static async updateMed({ id_medecin, nom , prenom , specialite, adresse, numero_tel }) {
        return await db.execute(
          `UPDATE medecin SET nom = ?, prenom = ?, specialite = ?, adresse = ?, numero_tel = ? WHERE id_medecin = ?`,[nom,prenom,specialite,adresse,numero_tel,id_medecin]
        );
      }
}
    

module.exports = Medecin;