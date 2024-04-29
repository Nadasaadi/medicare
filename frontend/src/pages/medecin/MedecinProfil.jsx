import React, { useState } from 'react';

const MedecinProfil = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [adresse, setAdresse] = useState('');
  const [numeroTel, setNumeroTel] = useState('');

  const handleModifier = () => {
    // Logique pour modifier les informations du professionnel
  };

  const handleLogout = () => {
    // Logique pour se déconnecter
  };

  const handleRecherchePatient = (email) => {
    // Logique pour rechercher le patient dans la base de données
  };

  return (
    <div className="espace-professionnel">
      <aside className="profil">
        <div className="photo">
          {/* Afficher la photo du médecin */}
        </div>
        <div className="informations">
          <p>Nom: {nom}</p>
          <p>Prénom: {prenom}</p>
          <p>Spécialité: {specialite}</p>
          <p>Adresse: {adresse}</p>
          <p>Numéro de téléphone: {numeroTel}</p>
          <button onClick={handleModifier}>Modifier</button>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      </aside>
      <section className="chercher-patient">
        <h2>Chercher patient</h2>
        <input type="text" placeholder="Email du patient" />
        <button onClick={() => handleRecherchePatient(email)}>Rechercher</button>
      </section>
    </div>
  );
};

export default MedecinProfil;
