const db = require("../util/database");
const AnalyseSanguine = require('../model/analyse');


exports.getAllAnalysesSanguines = async (req, res) => {

    try {
        console.log(req.user);
        const id_patient = req.user; 
        console.log(id_patient);
        const analysesSanguines = await AnalyseSanguine.getAllAnalysesSanguines(id_patient);
        res.status(200).json(analysesSanguines);

        console.log(analysesSanguines);
       // res.json(analysesSanguines);
    } catch (error) {
        console.error('Erreur lors de la récupération des analyses sanguines:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des analyses sanguines' });
    }
};
