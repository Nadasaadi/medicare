import React from 'react';


import allergie from '../assets/allergie.jpg';
import gestion from '../assets/gestion.jpg';
import portrait from '../assets/portrait.jpg';
import Partage from '../assets/partage.jpg'; // Ajout de l'image pour la gestion du temps

function Savoir_plus() {
  return (
    <section id="services">
      <div className="container">
      <h1>Nos services</h1>
        <h3>Voici quelques-uns des services que nous offrons:</h3>
        <ul>
          <li>
            <img src={gestion} alt="gestion des dossiers" />
            <h2>Gestion des dossiers médicaux électroniques</h2>
            <p>
Les professionnels de santé peuvent accéder électroniquement aux dossiers médicaux des patients, incluant antécédents, tests et prescriptions.</p>
          </li>
          <li>
            <img src={portrait} alt="portails patients" />
            <h2>Portails patients</h2>
            <p> Les patients peuvent accéder à leurs propres dossiers médicaux, consulter leurs résultats de tests, suivre leur état de santé, etc.</p>
          </li>
          <li>
            <img src={Partage} alt="partage securisé" />
            <h2>Partage sécurisé des informations médicales</h2>
            <p> Permet aux professionnels de santé de partager les informations médicales des patients lors de références</p>
          </li>
      
          <li>
            <img src={allergie} alt="gestion allergie" />
            <h2>Gestion des allergies et des intolérances</h2>
            <p>Permet aux professionnels de santé de suivre les allergies et intolérances des patients pour prévenir les interactions médicamenteuses</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Savoir_plus;