const bcrypt = require("bcrypt");
const db =  require("../util/database");



class User {
    constructor(email, password, nom, prenom, date_naissance, sexe, lieu_naissance){
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.date_naissancec = date_naissance;
        this.sexe = sexe;
        this.lieu_naissance = lieu_naissance;
    };


    static async testExistEmail(email) {
        return await db.execute( `SELECT email from patient WHERE email = "${email}" ;` )
    }
    
    static async testExistPassword(password) {
        return await db.execute( `SELECT password from patient WHERE password = "${password}" ;` )
    }
    static async login({email, password}) {
        const [[userData]] = await db.execute( `SELECT * from patient WHERE email = "${email}";` );
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
    

    static async signup ({email, password, nom, prenom, date_naissance, sexe,  lieu_naissance}) {
        const [[existEmail]] = await User.testExistEmail(email);
        if(existEmail){
            throw Error("email alredy exist");
        }
        return await db.execute( `Insert INTO patient (email, password, nom, prenom , date_naissance , sexe  , lieu_naissance) VALUES ("${email}", "${password}", "${nom}", "${prenom}",  "${date_naissance}", "${sexe}", "${lieu_naissance}");` );
    }
    static async findPatientByEmail(email) {
        const [[patient]] = await db.execute(`SELECT * FROM patient WHERE email = "${email}";`);
        if (!patient) {
          return null; // Ou vous pouvez lancer une erreur si vous préférez
        }
        
        const patientId = patient.id_patient; // Récupérez l'identifiant du patient
      
        // Récupérez les données des tables liées au patient
        const [analyses] = await db.execute(`SELECT * FROM analyse WHERE id_patient = ${patientId}`);
        const [vaccins] = await db.execute(`SELECT * FROM vaccin WHERE patient_id = ${patientId}`);
        const [allergies] = await db.execute(`SELECT * FROM allergie WHERE patient_id = ${patientId}`);
        const [maladiesChroniques] = await db.execute(`SELECT * FROM maladiechronique WHERE patient_id = ${patientId}`);
        const [imageries] = await db.execute(`SELECT * FROM imageriemedicale WHERE patient_id = ${patientId}`);
      
        // Construisez un objet contenant toutes les données du patient et des tables liées
        const patientData = {
          ...patient,
          analyses,
          vaccins,
          allergies,
          maladiesChroniques,
          imageries
        };
      
        return patientData;
      }
}


module.exports = User;