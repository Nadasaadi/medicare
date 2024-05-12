const db = require("../util/database");
const Vaccin = require('../model/vaccin');


exports.getAllVaccins = async (req, res) => {

    try {
        let {id_patient} = req.query;
        id_patient = id_patient.toString().replace(":", "")
        const vaccins = await Vaccin.getAllVaccins(id_patient);
        res.status(200).json(vaccins);
    } catch (error) {
        console.error('Erreur lors de la récupération des vaccins :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des vaccins' });
    }
};
