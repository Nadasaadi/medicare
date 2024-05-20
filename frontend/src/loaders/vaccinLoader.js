// Importation du module axios pour effectuer des requêtes HTTP
import axios from "axios";

// URL de l'API pour récupérer les données des vaccins
const VACCIN_URL = 'http://localhost:9000/vaccin/';

// Fonction asynchrone vaccinLoader pour charger les données des vaccins
export const vaccinLoader = async ({ params }) => {
    // Extraction de l'identifiant du patient à partir des paramètres
    const { id_patient } = params;

    // Envoi d'une requête GET à l'URL de l'API pour récupérer les données des vaccins associées au patient spécifié
    const vaccin = await axios.get(VACCIN_URL, {
        params: { id_patient }
    });

    // Retourne les données des vaccins obtenues de l'API
    return vaccin;
}
