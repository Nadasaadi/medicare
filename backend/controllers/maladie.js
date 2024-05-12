const db = require("../util/database");
const  Maladie = require('../model/maladie');


exports.getAllMaladies = async (req, res) => {

    try {
        let {id_patient} = req.query;
        id_patient = id_patient.toString().replace(":", "")
        const maladies = await Maladie.getAllMaladies(id_patient);
        res.status(200).json(maladies);
    } catch (error) {
        console.error('Erreur lors de la récupération des maladies chronique :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des maladies chronique' });
    }
};
