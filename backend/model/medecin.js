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
   
    static async updateMedecin(id, { nom = null, prenom = null, specialite = null, adresse = null, numero_tel = null }) {
        const updateFields = [];
        const values = [];
      
        if (nom !== null) {
          updateFields.push('nom = ?');
          values.push(nom);
        }
      
        if (prenom !== null) {
          updateFields.push('prenom = ?');
          values.push(prenom);
        }
      
        if (specialite !== null) {
          updateFields.push('specialite = ?');
          values.push(specialite);
        }
      
        if (adresse !== null) {
          updateFields.push('adresse = ?');
          values.push(adresse);
        }
      
        if (numero_tel !== null) {
          updateFields.push('numero_tel = ?');
          values.push(numero_tel);
        }
      
        if (updateFields.length === 0) {
          return; // Aucun champ à mettre à jour
        }
      
        const query = `
          UPDATE medecin
          SET ${updateFields.join(', ')}
          WHERE id = ?
        `;
      
        values.push(id);
        return await db.execute(query, values);
      }
    static async testExistEmail(email) {
        return await db.execute( `SELECT email from medecin WHERE email = "${email}" ;` )
    }
    
    static async testExistPassword(password) {
        return await db.execute( `SELECT password from medecin WHERE password = "${password}" ;` )
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

    static async signupM({ email, password, nom, prenom, specialite, adresse, numero_tel }) {
        const [[existEmail]] = await Medecin.testExistEmail(email);
        if (existEmail) {
          throw Error("email alredy exist");
        }
      
        // Hasher le mot de passe avant de l'insérer dans la base de données
        const hashedPassword = await bcrypt.hash(password, 10);
      
        // Utiliser des paramètres préparés pour éviter les injections SQL
        const query = `
          INSERT INTO medecin (email, password, nom, prenom, specialite, adresse, numero_tel)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [email, hashedPassword, nom, prenom, specialite, adresse, numero_tel];
      
        return await db.execute(query, values);
      }
}


module.exports = Medecin;