const db = require("../util/database");
const AnalyseSanguine = require('../model/analyse');


exports.getAllAnalysesSanguines = async (req, res) => {

    try {
        let {id_patient} = req.query; 
        id_patient = id_patient.toString().replace(":", "")
        const [analysesSanguines] = await AnalyseSanguine.getAllAnalysesSanguines(id_patient);
        console.log(analysesSanguines);
        res.status(200).json(analysesSanguines);
    } catch (error) {
        console.error('Erreur lors de la récupération des analyses sanguines:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des analyses sanguines' });
    }
};
