const db = require("../util/database");
const Admin = require("../model/admin");

const login = async (req, res) => {
    const {email, password} = req.body;
    try {

        const data = await Admin.login({email, password});
        // Si le mot de passe est valide, renvoyer les données de l'utilisateur
        res.status(200).json(data);
    } catch(error) {
        console.log(error.message)
        res.status(400).json({message: error.message});
    }
}

module.exports = {login};
