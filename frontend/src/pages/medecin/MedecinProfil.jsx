import React, { useContext, useState, useEffect } from 'react';
import { AuthContextMed } from '../../context/AuthContextMed';
import { Box, Typography, Button, TextField,Select,MenuItem, makeStyles, Avatar } from '@material-ui/core';
import profil from '../../assets/personne.png';
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
    height: '100%', //  pour que le profil prenne toute la distance verticale
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
  const [showSignupForm, setShowSignupForm] = useState(false);

  const { logout } = React.useContext(AuthContextMed);

  // Déstructurer les propriétés de l'objet medecin
  const { nom, prenom, specialite, adresse, numero_tel } = medecin || {};

  const handleModifier = () => {
    // Logique pour modifier les informations du professionnel
    console.log('Modifier les informations du médecin');
  };

  const handleRecherchePatient = () => {
    // Logique pour rechercher le patient dans la base de données
    console.log(`Rechercher le patient avec l'email: ${email}`);
  };

  const handleAjouterPatient = () => {
    setShowSignupForm(true);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.aside}>
        <Avatar  className={classes.avatar} src={profil} />
        <Typography variant="h6">Profil</Typography>
        <Typography>Nom: {nom}</Typography>
        <Typography>Prénom: {prenom}</Typography>
        <Typography>Spécialité: {specialite}</Typography>
        <Typography>Adresse: {adresse}</Typography>
        <Typography>Numéro de téléphone: {numero_tel}</Typography>
        <Button onClick={handleModifier} style={{ margin: '5px' }} variant="contained" color="primary">
          Modifier
        </Button>
        <Button onClick={logout} style={{ margin: '5px'}} variant="contained" color="secondary">
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
          <Button onClick={handleRecherchePatient}  variant="contained" color="primary">
            Rechercher
          </Button>
        </Box>
        <Button onClick={handleAjouterPatient} variant="contained" color="primary">
          Ajouter nouveau patient
        </Button>
        {showSignupForm && (
            <Box>
              <Typography variant="h6">Ajouter un nouveau patient</Typography>
              {/* Ajoutez ici les champs pour le formulaire d'inscription */}
              <TextField label="Nom" />
              <TextField label="Prénom" />
              <TextField label="Email" />
              <TextField label="Date naissance" />
              <Select label="Sexe">
                <MenuItem value="M">Homme</MenuItem>
                <MenuItem value="F">Femme</MenuItem>
              </Select>
              
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default MedecinProfil;