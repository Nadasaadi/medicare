import React, { useContext, useState, useEffect } from 'react';
import { AuthContextMed } from '../../context/AuthContextMed';
import { Box, Typography, Button, TextField, Select, MenuItem, makeStyles, Avatar } from '@material-ui/core';
import profil from '../../assets/personne.png';
import Footer from "../../components/Footer"
import axios from 'axios';
const UPDATE_URL = 'http://localhost:9000/medecin/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  aside: {
    width: '200px',
    padding: theme.spacing(2),
    marginRight: theme.spacing(40),
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

const MedecinProfil = () => {
  const classes = useStyles();
  const { medecin, logoutMedecin } = useContext(AuthContextMed);
  const [email, setEmail] = useState('');
  const [updatedMedecin, setUpdatedMedecin] = useState({
    
    nom: '',
    prenom: '',
    specialite: '',
    adresse: '',
    numero_tel: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const { logout } = React.useContext(AuthContextMed);


  // Déstructurer les propriétés de l'objet medecin
  const { id, nom, prenom, specialite, adresse, numero_tel } = medecin || {};

  const handleModifier = () => {
    setIsEditing(true);
    setUpdatedMedecin({
      id: medecin.id,
      nom: medecin.nom,
      prenom: medecin.prenom,
      specialite: medecin.specialite,
      adresse: medecin.adresse,
      numero_tel: medecin.numero_tel,
    });
  };

  const handleEnregistrer = async () => {
    try {

      // Utiliser l'ID récupéré du contexte AuthContextMed
      const response = await axios.put(`${UPDATE_URL}${id}`, updatedMedecin);
  
      if (response.status === 200) {
        console.log('Informations du médecin mises à jour avec succès');
        // Mettre à jour l'état medecin avec les nouvelles informations
        const updatedMedecin = response.data;
        // Vous pouvez mettre à jour le contexte AuthContextMed ici si nécessaire
        setIsEditing(false);
      } else {
        console.error('Erreur lors de la mise à jour des informations du médecin');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de mise à jour des informations du médecin', error);
    }
  };


  const handleNomChange = (event) => {
    setUpdatedMedecin({ ...updatedMedecin, nom: event.target.value });
  };

  const handlePrenomChange = (event) => {
    setUpdatedMedecin({ ...updatedMedecin, prenom: event.target.value });
  };

  const handleSpecialiteChange = (event) => {
    setUpdatedMedecin({ ...updatedMedecin, specialite: event.target.value });
  };

  const handleAdresseChange = (event) => {
    setUpdatedMedecin({ ...updatedMedecin, adresse: event.target.value });
  };

  const handleNumeroTelChange = (event) => {
    setUpdatedMedecin({ ...updatedMedecin, numero_tel: event.target.value });
  };

  const handleRecherchePatient = () => {
    console.log(`Rechercher le patient avec l'email: ${email}`);
  };



  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.aside}>
          <Avatar className={classes.avatar} src={profil} />
          <Typography variant="h6">Profil</Typography>
          <TextField
            label="Nom"
            value={isEditing ? updatedMedecin.nom : nom}
            onChange={handleNomChange}
            disabled={!isEditing}
          />
          <TextField
            label="Prénom"
            value={isEditing ? updatedMedecin.prenom : prenom}
            onChange={handlePrenomChange}
            disabled={!isEditing}
          />
          <TextField
            label="Spécialité"
            value={isEditing ? updatedMedecin.specialite : specialite}
            onChange={handleSpecialiteChange}
            disabled={!isEditing}
          />
          <TextField
            label="Adresse"
            value={isEditing ? updatedMedecin.adresse : adresse}
            onChange={handleAdresseChange}
            disabled={!isEditing}
          />
          <TextField
            label="Numéro de téléphone"
            value={isEditing ? updatedMedecin.numero_tel : numero_tel}
            onChange={handleNumeroTelChange}
            disabled={!isEditing}
          />
          {isEditing ? (
            <Button style={{margin:'10px'}} onClick={handleEnregistrer} variant="contained" color="primary">
              Enregistrer
            </Button>
          ) : (
            <Button style={{margin:'10px'}} onClick={handleModifier} variant="contained" color="primary">
              Modifier
            </Button>
          )}
          <Button onClick={logout} variant="contained" color="secondary">
            Déconnexion
          </Button>
        </Box>
        <Box className={classes.content}>
          <Box className={classes.searchBar}>
            <TextField
              label="Chercher patient"
              value={email}
             
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleRecherchePatient} variant="contained" color="primary">
              Rechercher
            </Button>
          </Box>
         
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MedecinProfil;