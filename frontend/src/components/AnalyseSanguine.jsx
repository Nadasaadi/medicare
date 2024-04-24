import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP
import { useQuery } from 'react-query';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFontSize } from '../context/FontSizeContext';
const ANALYSE_URL='http://localhost:9000/analyse/';
function AnalyseSanguine() {
  const {user}  = useAuthContext(); // Utiliser le hook useAuthContext pour récupérer le contexte d'authentification  
  const id_patient = user.id_patient; // Récupérer l'ID du patient à partir du contexte d'authentification
  const { largeFont } = useFontSize();


  //console.log(id_patient,"nada");
  const { isLoading, error, data: analysesSanguines } = useQuery('analysesSanguines', async () => {
    const response = await axios.get(ANALYSE_URL, { params : { id_patient: id_patient } });
    return response.data;
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  

  return (
    <div className={largeFont ? 'large-font' : ''}>
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
