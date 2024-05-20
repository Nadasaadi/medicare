const bcrypt = require("bcrypt");
const db = require("../util/database");
const User = require("../model/user");

const signup = async (req, res) => {
    try {
        const {email, password, nom, prenom, sexe, date_naissance, lieu_naissance} = req.body;
        
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de tours de hachage

        // Créer un nouvel utilisateur avec le mot de passe haché
        await User.signup({email, password: hashedPassword, nom, prenom, sexe, date_naissance, lieu_naissance});

        res.status(200).json({email, password, nom, prenom, sexe, date_naissance, lieu_naissance});
    } catch(error) {
        res.status(400).json({"error": error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {

        const data = await User.login({email, password});
        // Si le mot de passe est valide, renvoyer les données de l'utilisateur
        res.status(200).json(data);
    } catch(error) {
        console.log(error.message)
        res.status(400).json({message: error.message});
    }
    
}
const findPatientByEmail = async (req, res) => {
    const { email } = req.params;
    try {
      const patientData = await User.findPatientByEmail(email);
      if (!patientData) {
        return res.status(404).json({ message: 'Patient non trouvé' });
      }
      res.status(200).json(patientData);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la recherche du patient' });
    }
  };

module.exports = {signup, login, findPatientByEmail};
