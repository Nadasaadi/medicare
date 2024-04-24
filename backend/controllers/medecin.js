const bcrypt = require("bcrypt");
const db = require("../util/database");
const Medecin = require("../model/medecin");

const signupM = async (req, res) => {
    try {
        const {email, password, nom, prenom, specialite , adresse, numero_tel} = req.body;
        
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de tours de hachage

        // Créer un nouvel utilisateur avec le mot de passe haché
        await Medecin.signupM({email, password: hashedPassword, nom, prenom, sexe, date_naissance, lieu_naissance});

        res.status(200).json({email, password, nom, prenom, specialite , adresse, numero_tel});
    } catch(error) {
        res.status(400).json({"error": error.message});
    }
}

const loginM = async (req, res) => {
    const {email, password} = req.body;
    try {

        const data = await Medecin.loginM({email, password});
        // Si le mot de passe est valide, renvoyer les données de l'utilisateur
        res.status(200).json(data);
    } catch(error) {
        console.log(error.message)
        res.status(400).json({message: error.message});
    }
}

module.exports = {signupM, loginM};
