import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnalyseUrinaire() {
  const [analysesUrinaires, setAnalysesUrinaires] = useState([]);

  useEffect(() => {
    // Effet pour charger les données des analyses urinaires depuis la base de données
    axios.get('/api/analyses-urinaires')
      .then(response => {
        setAnalysesUrinaires(response.data); // Assurez-vous que response.data est un tableau
      })
      .catch(error => {
        console.error('Erreur lors du chargement des analyses urinaires:', error);
      });
  }, []);

  // Vérifiez si les analyses urinaires sont un tableau avant de les mapper
  if (!Array.isArray(analysesUrinaires)) {
    return <div>Chargement...</div>; // Ou un message d'erreur approprié
  }

  return (
    <div>
      <h2>Analyses Urinaires</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type d'analyse</th>
            <th>Marqueurs</th>
            <th>Résultats</th>
            <th>Autres informations</th>
          </tr>
        </thead>
        <tbody>
          {analysesUrinaires.map(analyse => (
            <tr key={analyse.id_analyse}>
              <td>{analyse.date_analyse}</td>
              <td>{analyse.type_analyse}</td>
              <td>{analyse.marqueurs}</td>
              <td>{analyse.resultats}</td>
              <td>{analyse.autres_informations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyseUrinaire;
