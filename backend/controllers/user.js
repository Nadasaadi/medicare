const db = require("../util/database");

const User = require("../model/user");
const signup = async (req, res) => {
        const {email, password, nom, prenom, sexe, date_naissance, lieu_naissance} = req.body;
        await User.signup({email, password, nom, prenom, sexe, date_naissance, lieu_naissance});
        res.status(200).json({email, password, nom, prenom, sexe, date_naissance, lieu_naissance});
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const [[data]] = await User.login({email, password});
    console.log(data)
    res.status(200).json(data);
}


module.exports = {signup, login};