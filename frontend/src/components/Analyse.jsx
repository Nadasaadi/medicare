import React, { useState } from 'react';
import AnalyseSanguine from './AnalyseSanguine';
import AnalyseUrinaire from './AnalyseUrinaire';
import AnalyseMicrobiologique from './AnalyseMicrobiologique';
import { useFontSize } from '../context/FontSizeContext'; // Importez le hook du contexte de la taille de la police

function Analyse() {
  const [typeAnalyse, setTypeAnalyse] = useState('');
  const { largeFont } = useFontSize(); // Utilisez le hook pour lire l'état de l'agrandissement du texte

  return (
    <>
      <h1 id='analyse'> Analyse</h1>
      <div className={`analyse-navigation ${largeFont ? 'large-font' : ''}`}>
        {/* Barre de navigation */}
        <button  className={typeAnalyse === 'sanguine' ? 'selected' : ''} onClick={() => setTypeAnalyse('sanguine')}>Analyse Sanguine</button>
        <button className={typeAnalyse === 'urinaire' ? 'selected' : ''} onClick={() => setTypeAnalyse('urinaire')}>Analyse Urinaire</button>
        <button className={typeAnalyse === 'microbiologique' ? 'selected' : ''} onClick={() => setTypeAnalyse('microbiologique')}>Analyse Microbiologique</button>
      </div>

      {/* Affichage du composant correspondant au type d'analyse sélectionné */}
      {typeAnalyse === '' && <p className={`analyse-navigation-p ${largeFont ? 'large-font' : ''}`} >Veuillez sélectionner un type d'analyse.</p>}
      {typeAnalyse === 'sanguine' && <AnalyseSanguine />}
       
      {typeAnalyse === 'urinaire' && <AnalyseUrinaire />}
      {typeAnalyse === 'microbiologique' && <AnalyseMicrobiologique />}
    </>
  );
}

export default Analyse;
