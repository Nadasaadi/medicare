
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
        return await db.execute( `SELECT * from patient WHERE email = "${email}" and password = "${password}";` )
    }

    static async signup ({email, password, nom, prenom, date_naissance, sexe,  lieu_naissance}) {
        const [[existEmail]] = await User.testExistEmail(email);
        if(existEmail.email != undefined){
            throw Error("email alredy exist");
        }
        return await db.execute( `Insert INTO patient (email, password, nom, prenom , date_naissance , sexe  , lieu_naissance) VALUES ("${email}", "${password}", "${nom}", "${prenom}",  "${date_naissance}", "${sexe}", "${lieu_naissance}");` );
    }
}


module.exports = User;