// Profil.js
import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button, Typography,Divider  } from '@mui/material';
import { useFontSize } from '../../context/FontSizeContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate,useParams } from 'react-router-dom';

const Profil = () => {
  const { user } = useAuthContext();
  const { largeFont } = useFontSize();
  const { nom, prenom, sexe, date_naissance, lieu_naissance } = user;
  const navigate = useNavigate();

  console.log(user.id_patient);

  return (
    <div id='profil' className={`profil-container ${largeFont ? 'large-font' : ''}`}>
      <h2>Profil Utilisateur</h2>
      <p><span className="label">Nom:</span> {nom}</p>
      <Divider />
      <p><span className="label">Prénom:</span> {prenom}</p>
      <Divider />
      <p><span className="label">Sexe:</span> {sexe}</p>
      <Divider />
      <p><span className="label">Date de Naissance:</span> {date_naissance.split('T')[0]}</p>
      <Divider />
      <p><span className="label">Lieu de Naissance:</span> {lieu_naissance}</p>
      <Divider />
      <div className='button-resp'>
       
      <Button
  variant="contained"
  onClick={() => navigate(`/espace-patient/analyse/${user.id_patient}`)}
  color="primary"
  sx={{ marginTop: "20px", marginLeft: 'auto' }}
>
  Suivant
</Button>
      
      </div>
    </div>
  );
};

export default Profil;