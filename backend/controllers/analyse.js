const db = require("../util/database");
const AnalyseSanguine = require('../model/analyse');

exports.getAllAnalysesSanguines = async (req, res) => {
    try {
        const analysesSanguines = await AnalyseSanguine.getAllAnalysesSanguines();
        res.json(analysesSanguines);
    } catch (error) {
        console.error('Erreur lors de la récupération des analyses sanguines:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des analyses sanguines' });
    }
};
