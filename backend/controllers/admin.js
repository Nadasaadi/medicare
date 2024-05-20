const db = require("../util/database");
const Admin = require("../model/admin");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await Admin.login({ email, password });
    // Email et mot de passe valides, renvoyer les données de l'utilisateur
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message }); // Renvoyer un code d'erreur 401 Unauthorized
  }
};

module.exports = { login };