import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP

function AnalyseSanguine() {
  // État local pour stocker les données des analyses sanguines
  const [analysesSanguines, setAnalysesSanguines] = useState([]);

  // Effet pour charger les données des analyses sanguines depuis la base de données
  useEffect(() => {
    const fetchAnalysesSanguines = async () => {
      try {
        const response = await axios.get('/api/analyses-sanguines');
        console.log('Données des analyses sanguines:', response.data); // Vérifier les données reçues
        setAnalysesSanguines(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des analyses sanguines:', error);
      }
    };
  
    fetchAnalysesSanguines();
  }, []);
  
  

  return (
    <div>
      {/* Affichage des analyses sanguines */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Marqueur Sanguin</th>
            <th>Résultat</th>
            <th>Unité</th>
            <th>Autres Informations</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(analysesSanguines) && analysesSanguines.map(analyse => (
            <tr key={analyse.ID_Analyse}>
              <td>{analyse.Date}</td>
              <td>{analyse.Type}</td>
              <td>{analyse.MarqueurSanguin}</td>
              <td>{analyse.Resultat}</td>
              <td>{analyse.UniteMesure}</td>
              <td>{analyse.AutresInformations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyseSanguine;
