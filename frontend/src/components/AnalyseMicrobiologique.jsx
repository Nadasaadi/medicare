import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnalyseMicrobiologique() {
  const [analysesMicrobiologiques, setAnalysesMicrobiologiques] = useState([]);

  useEffect(() => {
    // Effet pour charger les données des analyses microbiologiques depuis la base de données
    axios.get('/api/analyses-microbiologiques')
      .then(response => {
        setAnalysesMicrobiologiques(response.data); // Assurez-vous que response.data est un tableau
      })
      .catch(error => {
        console.error('Erreur lors du chargement des analyses microbiologiques:', error);
      });
  }, []);

  // Vérifiez si les analyses microbiologiques sont un tableau avant de les mapper
  if (!Array.isArray(analysesMicrobiologiques)) {
    return <div>Chargement...</div>; // Ou un message d'erreur approprié
  }

  return (
    <div>
      <h2>Analyses Microbiologiques</h2>
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
          {analysesMicrobiologiques.map(analyse => (
            <tr key={analyse.ID}>
              <td>{analyse.DateAnalyse}</td>
              <td>{analyse.TypeAnalyse}</td>
              <td>{analyse.Marqueurs}</td>
              <td>{analyse.Resultats}</td>
              <td>{analyse.AutresInformations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyseMicrobiologique;
