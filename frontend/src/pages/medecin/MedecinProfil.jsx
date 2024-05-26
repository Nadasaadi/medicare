import React, { useContext, useState, useEffect } from 'react';
import { AuthContextMed } from '../../context/AuthContextMed';
import { Box, Typography, Button, TextField, makeStyles, Avatar, Modal } from '@material-ui/core';
import { Card, CardHeader, CardContent, IconButton } from '@mui/material';
import profil from '../../assets/image_2024-05-22_154251923-removebg-preview.png';
import Footer from "../../components/Footer";
import axios from 'axios';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper,Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import { color, motion } from 'framer-motion';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';



const FIND_PATIENT_URL = ' http://localhost:9000/user/user/';
const VACCIN_URL='http://localhost:9000/vaccin/add/';
const ALLERGIE_URL='http://localhost:9000/allergie/add';
const MALADIE_URL ='http://localhost:9000/maladie/add';
const UPDATE_URL = 'http://localhost:9000/medecin/updateMedecin';
const CONSULTATION_URL = 'http://localhost:9000/consultation';
const AJOUTER_CONSULTATION_URL = 'http://localhost:9000/consultation/addConsultation';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //justifyContent: 'center',
    //alignItems: 'center',
  
  },
  aside: {
    width: '200px',
    padding: theme.spacing(2),
    marginRight: theme.spacing(1),
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: theme.shape.borderRadius,
    width: '500px',
  },
  searchTitle: {
    marginBottom: theme.spacing(2),
    color: '#0d3d6e',
    animation: '$fadeInUp 0.5s ease-in-out',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(3),
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
  },
  dialog: {
    '& .MuiDialogTitle-root': {
      backgroundColor: "#4d7094",
      color: theme.palette.common.white,
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(2),
    },
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
    '& input[type="file"]': {
      display: 'block',
      marginTop: theme.spacing(2),
    },
  },
  addButton: {
    backgroundColor: theme.palette.common.white,
    color: '#0d3d6e',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color:" #006600"
    },
  },
  cancelButton: {
    color: theme.palette.primary.main,
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    
  },
  navItem: {
    display: 'inline-block',
    width :'150px',
    padding: 5,
    backgroundColor : 'white',
    borderRadius : '10%',
    margin :3,
    alignSelf:'end',
    cursor: 'pointer',
    color: '#0d3d6e',
    '&:hover': {
      backgroundColor: '#0d3d6e',
      textDecoration: 'underline',
      color :'white'
    },
  },
  navLink: {
  
    textDecoration: 'none',
    color: 'inherit',
  },
}));


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MedecinProfil = () => {
  const [showSearchBar, setShowSearchBar] = useState(true);
  const classes = useStyles();
  const { medecin} = useContext(AuthContextMed);
  const [email, setEmail] = useState('');
  const [updatedMedecin, setUpdatedMedecin] = useState({
    id_medecin :medecin.id_medecin,
    nom: '',
    prenom: '',
    specialite: '',
    adresse: '',
    numero_tel: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [patient, setPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false); // État pour la fenêtre modale

  const { logout } = React.useContext(AuthContextMed);
  const { id_medecin, nom, prenom, specialite, adresse, numero_tel } = medecin ? medecin : {};

  const handleModifier = () => {
    setIsEditing(true);
    setUpdatedMedecin({
      id_medecin : medecin.id_medecin,
      nom: medecin.nom,
      prenom: medecin.prenom,
      specialite: medecin.specialite,
      adresse: medecin.adresse,
      numero_tel: medecin.numero_tel,
    });
  };
  
  const handleEnregistrer = async () => {
    console.log(updatedMedecin)
    try {
     const response = await axios.put(UPDATE_URL, updatedMedecin); 
     console.log(response)   
      if (response.status === 200) {
        console.log('Informations du médecin mises à jour avec succès');
        const updatedMedecinData = response.data;
        //setMedecin(updatedMedecinData);
        setUpdatedMedecin(updatedMedecinData);
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

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsEmailValid(emailRegex.test(emailValue));
  };

  const handleRecherchePatient = async () => {
    if (isEmailValid) {
      try {
        const response = await axios.get(`${FIND_PATIENT_URL}${email}`);
        const patientData = response.data;
        setPatient(patientData);
        console.log('Données du patient :', patientData);
        setShowSearchBar(false); // Masquer la barre de recherche
      } catch (error) {
        console.error('Erreur lors de la recherche du patient :', error);
        setPatient(null);
        setOpenModal(true); // Ouvrir la fenêtre modale
      }
    } else {
      console.log('Email invalide');
      setPatient(null);
      setOpenModal(false); // Fermer la fenêtre modale
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };


//gestion d'ajout d'une nouvelle maladie chronique
const [openMaladie, setOpenMaladie] = useState(false);
const [newMaladie, setNewMaladie] = useState({ nom_maladie: '',  description: '' });
const [successMessageMaladie, setSuccessMessageMaladie] = useState('');
const [nomMaladieError, setNomMaladieError] = useState(false);
const handleOpenMaladie = () => {
  setOpenMaladie(true);
};

const handleCloseMaladie = () => {
  setOpenMaladie(false);
  setNewMaladie({ nom_maladie: '',  description: '' });
};

const handleChangeMaladie = (e) => {
  setNewMaladie({ ...newMaladie, [e.target.name]: e.target.value });
};

const handleSubmitMaladie = async () => {
  if (newMaladie.nom_maladie.trim() === '') {
    setNomMaladieError(true);
    return;
  }

  setNomMaladieError(false);

  try {
    const response = await axios.post(MALADIE_URL, {
      nom_maladie: newMaladie.nom_maladie,
      description: newMaladie.description,
      id_patient: patient.id_patient, // Ajoutez l'id_patient ici
    });

    if (response.status === 201) {
      // ajouté avec succès
      setSuccessMessageMaladie('Nouvelle maladie chronique ajoutée avec succès');
      setNewMaladie({ nom_maladie: '', description: '' });
      handleCloseMaladie();
      // Mettre à jour la liste immédiatement
      fetchMaladie();
    } else {
      // Une erreur s'est produite lors de l'ajout de la maladie
      console.error('Erreur lors de l\'ajout de la maladie', response.data);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la maladie :', error);
  }
};
const fetchMaladie = async () => {
  try {
    const response = await axios.get(`${MALADIE_URL}?id_patient=${patient.id}`);
    // Vérifiez la structure de la réponse du backend
    console.log('Réponse du backend :', response.data);

    // Mettez à jour l'état avec la nouvelle liste de vaccins
    setPatient((prevState) => ({
      ...prevState,
      maladies: response.data.maladies || [], // Supposant que les maladies sont dans response.data.maladies
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des maladies :', error);
  }
};


//gestion d'ajout d'une nouvelle allergie
const [openAllergie, setOpenAllergie] = useState(false);
const [newAllergie, setNewAllergie] = useState({ nom_allergie: '',  description: '' });
const [successMessageAllergie, setSuccessMessageAllergie] = useState('');
const [nomAllergieError, setNomAllergieError] = useState(false);
const handleOpenAllergie = () => {
  setOpenAllergie(true);
};

const handleCloseAllergie = () => {
  setOpenAllergie(false);
  setNewAllergie({ nom_allergie: '',  description: '' });
};

const handleChangeAllergie = (e) => {
  setNewAllergie({ ...newAllergie, [e.target.name]: e.target.value });
};

const handleSubmitAllergie = async () => {
  if (newAllergie.nom_allergie.trim() === '') {
    setNomAllergieError(true);
    return;
  }

  setNomAllergieError(false);

  try {
    const response = await axios.post(ALLERGIE_URL, {
      nom_allergie: newAllergie.nom_allergie,
      description: newAllergie.description,
      id_patient: patient.id_patient,
    });

    if (response.status === 201) {
      setSuccessMessageAllergie('Nouvelle allergie ajoutée avec succès');
      setNewAllergie({ nom_allergie: '', description: '' });
      handleCloseAllergie();
      fetchAllergie();
    } else {
      console.error('Erreur lors de l\'ajout de l\'allergie', response.data);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'allergie :', error);
  }
};
const fetchAllergie = async () => {
  try {
    const response = await axios.get(`${ALLERGIE_URL}?id_patient=${patient.id}`);
    // Vérifiez la structure de la réponse du backend
    console.log('Réponse du backend :', response.data);

    // Mettez à jour l'état avec la nouvelle liste de vaccins
    setPatient((prevState) => ({
      ...prevState,
      allergies: response.data.allergies || [], // Supposant que les allergies sont dans response.data.vaccins
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des allergies :', error);
  }
};



//gestion d'ajout de nouveau vaccin
  const [searchYear, setSearchYear] = useState('');
  const [open, setOpen] = useState(false);
  const [newVaccin, setNewVaccin] = useState({ nom_vaccin: '', date_administration: '', remarques: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewVaccin({ nom_vaccin: '', date_administration: '', remarques: '' });
  };

  const handleChange = (e) => {
    setNewVaccin({ ...newVaccin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let hasErrors = false;
    const newErrors = { nomVaccin: false, dateAdministration: false };
  
    if (!newVaccin.nom_vaccin) {
      newErrors.nomVaccin = true;
      hasErrors = true;
    }
  
    if (!newVaccin.date_administration) {
      newErrors.dateAdministration = true;
      hasErrors = true;
    }
  
    setErrors(newErrors);
  
    if (hasErrors) {
      return;
    }
  
    try {
      const response = await axios.post(VACCIN_URL, {
        nom_vaccin: newVaccin.nom_vaccin,
        date_administration: newVaccin.date_administration,
        remarques: newVaccin.remarques,
        id_patient: patient.id_patient,
      });
  
      if (response.status === 201) {
        setSuccessMessage('Nouveau vaccin ajouté avec succès');
        setNewVaccin({ nom_vaccin: '', date_administration: '', remarques: '' });
        handleClose();
        fetchVaccins();
      } else {
        console.error('Erreur lors de l\'ajout du vaccin', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du vaccin :', error);
    }
  };
  const fetchVaccins = async () => {
    try {
      const response = await axios.get(`${VACCIN_URL}?id_patient=${patient.id}`);
      // Vérifiez la structure de la réponse du backend
      console.log('Réponse du backend :', response.data);
  
      // Mettez à jour l'état avec la nouvelle liste de vaccins
      setPatient((prevState) => ({
        ...prevState,
        vaccins: response.data.vaccins || [], // Supposant que les vaccins sont dans response.data.vaccins
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des vaccins :', error);
    }
  };
  const handleSearchYearChange = (event) => {
    setSearchYear(event.target.value);
  };

// Gestion des états et fonctions des imageries 
const [file, setFile] = useState(null);
const [descriptionimage, setDescriptionimage] = useState('');
const [datePrise, setDatePrise] = useState('');
const [searchYearimagerie, setSearchYearimagerie] = useState('');
const [images, setImages] = useState([]);
const [openimagerie, setOpenimagerie] = useState(false);
const [openDetails, setOpenDetails] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [successMessageimagerie, setSuccessMessageimagerie] = useState('');

useEffect(() => {
  if (patient && patient.id_patient) {
    fetchImages();
  }
}, [patient]);

const handleOpenimagerie = () => {
  setOpenimagerie(true);
};

const handleCloseimagerie = () => {
  setOpenimagerie(false);
};

const handleOpenDetails = (image) => {
  setSelectedImage(image);
  setOpenDetails(true);
};

const handleCloseDetails = () => {
  setOpenDetails(false);
};

const handleSearchYearChangeimagerie = (event) => {
  setSearchYearimagerie(event.target.value);
};
const [errors, setErrors] = useState({ file: false, datePrise: false });

const handleUpload = async () => {
  let hasErrors = false;
  const newErrors = { file: false, datePrise: false };

  if (!file) {
    newErrors.file = true;
    hasErrors = true;
  }

  if (!datePrise) {
    newErrors.datePrise = true;
    hasErrors = true;
  }

  setErrors(newErrors);

  if (hasErrors) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', descriptionimage);
    formData.append('date_prise', datePrise);
    formData.append('id_patient', patient.id_patient);

    const response = await axios.post('http://localhost:9000/imagerie', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);
    setFile(null); // Clear file input after upload
    setDescriptionimage('');
    setDatePrise('');
    setSuccessMessageimagerie('Image ajoutée avec succès !');
    setOpenimagerie(false); // Close modal after upload
    fetchImages(); // Refresh the image list after upload
  } catch (err) {
    console.error(err);
  }
};

const fetchImages = async () => {
  try {
    const response = await axios.get(`http://localhost:9000/imagerie/${patient.id_patient}`);
    setImages(response.data);
  } catch (err) {
    console.error(err);
  }
};
//gestion des consultations 
const [consultations, setConsultations] = useState([]);
 // Fonction pour récupérer les consultations
 const fetchConsultations = async () => {
  try {
    const response = await axios.get(`${CONSULTATION_URL}?id_patient=${patient.id_patient}`);
    setConsultations(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations :', error);
  }
};
 // Effet pour récupérer les consultations lorsque le patient change
 useEffect(() => {
  if (patient && patient.id_patient) {
    fetchConsultations();
  }
}, [patient]);
const [openAjouterConsultation, setOpenAjouterConsultation] = useState(false);
  const [nouvelleConsultation, setNouvelleConsultation] = useState({
    date_consultation: '',
    medecin_nom: medecin.nom,
    medecin_prenom: medecin.prenom,
    conclusion: '',
    // Autres champs nécessaires
  });

  const handleOpenAjouterConsultation = () => {
    setOpenAjouterConsultation(true);
  };

  const handleCloseAjouterConsultation = () => {
    setOpenAjouterConsultation(false);
    setNouvelleConsultation({
      date_consultation: '',
      medecin_nom: medecin.nom,
      medecin_prenom: medecin.prenom,
      conclusion: '',
      // Réinitialisez les autres champs
    });
  };

  const handleInputChange = (e) => {
    setNouvelleConsultation({
      ...nouvelleConsultation,
      [e.target.name]: e.target.value,
    });
  };

  const handleAjouterConsultation = async () => {
    try {
      const response = await axios.post(AJOUTER_CONSULTATION_URL, nouvelleConsultation);
      console.log(response)
      if (response.status === 201) {
        console.log('Consultation ajoutée avec succès');
        handleCloseAjouterConsultation();
        // Rafraîchir la liste des consultations
        fetchConsultations();
      } else {
        console.error('Erreur lors de l\'ajout de la consultation', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la consultation :', error);
    }
  };

//gestion des analyses 
const [searchYearAnalyse, setSearchYearAnalyse] = useState('');
const handleSearchYearChangeAnalyse = (event) => {
  setSearchYearAnalyse(event.target.value);
};


 
  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.aside}>
        <Avatar className={classes.avatar} src={profil} />
          <Typography variant="h6">Profil</Typography>
          <TextField
            label="Nom"
            value={isEditing ? updatedMedecin.nom : nom }
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
            <Button style={{backgroundColor:'#339966', margin:'10px'}} onClick={handleEnregistrer} variant="contained"  color="primary">
              Enregistrer
            </Button>
          ) : (
            <Button style={{backgroundColor: '#26527d' ,margin:'10px'}} onClick={handleModifier} variant="contained"  color="primary">
              Modifier
            </Button>
          )}
          <Button onClick={logout} variant="contained" color="secondary" style={{backgroundColor:'#cc6600'}}>
            Déconnexion
          </Button>
        </Box>
        <Box className={classes.content}>
          {showSearchBar ? (
            <motion.div
              className={classes.searchBar}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" className={classes.searchTitle}>
                Rechercher un patient
              </Typography>
              <Typography variant="body1" gutterBottom>
                Saisissez l'email du patient pour accéder à son dossier médical.
              </Typography>
              <TextField
                label="Email"
                value={email}
                onChange={handleEmailChange}
                placeholder="exemple@email.com"
                error={!isEmailValid && email.length > 0}
                helperText={!isEmailValid && email.length > 0 ? 'Email invalide' : ''}
              />
              <Button
                onClick={handleRecherchePatient}
                variant="contained"
                color="primary"
                disabled={!isEmailValid}
                style={{ margin: '10px' }}
              >
                Rechercher
              </Button>
            </motion.div>
          ) : (
            <Box>
  
  {patient && (
    <>
    <Box component="nav" style={{height:60}}className={classes.navbar}>
      <List component="div" sx={{ display: 'flex', flexDirection: 'row', padding: 0}}>
        <ListItem button component="a" href="#profil" className={classes.navItem}>
          <ListItemText primary="Profil" className={classes.navLink} />
        </ListItem>
        <ListItem button component="a" href="#analyse" className={classes.navItem}>
          <ListItemText primary="Analyses" className={classes.navLink} />
        </ListItem>
        <ListItem button component="a" href="#vaccin" className={classes.navItem}>
          <ListItemText primary="Vaccin" className={classes.navLink} />
        </ListItem>
        <ListItem button component="a" href="#allergie" className={classes.navItem}>
          <ListItemText primary="Allergie" className={classes.navLink} />
        </ListItem>
        <ListItem button component="a" href="#maladiechronique" className={classes.navItem}>
          <ListItemText primary="Maladie chronique" className={classes.navLink} />
        </ListItem>
        <ListItem button component="a" href="#imagerie" className={classes.navItem}>
          <ListItemText primary="Imagerie médicale" className={classes.navLink} />
        </ListItem>
      </List>
    </Box>
    <Box >
      <Card style={{ marginLeft:"30px", width: '58rem' }}>
        <CardHeader
          sx={{ paddingBottom: 0, backgroundColor: '#26527d', paddingTop: 5 }}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
            <Typography variant="h6" fontWeight="bold" color="#003366">
              {patient.nom} {patient.prenom}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" ml={1}>
                Sexe : {patient.sexe}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            
            <Typography variant="body1" ml={1}>
              Date de naissance : {new Date(patient.date_naissance).toLocaleDateString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
         
            <Typography variant="body1" ml={1}>
              Lieu de naissance : {patient.lieu_naissance}
            </Typography>
          </Box></CardContent>
      </Card>
    </Box>
      
  {/* Consultations */}
        <Box mb={4} id="consultation" style={{ margin: '30px' }}>
          <Typography style={{ color: '#0d3d6e' }} variant="h6" gutterBottom>
            Consultations
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
              
              <TableCell>Date consultation</TableCell>
              <TableCell>Médecin consultant</TableCell>
              <TableCell>Conclusion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {consultations.map((consultation) => (
                  <TableRow key={consultation.id_consultation}>
                  <TableCell>{new Date(consultation.date_consultation).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenModal(consultation)}>
                      {consultation.medecin_nom} {consultation.medecin_prenom}
                    </Button>
                  </TableCell>
                  <TableCell>{consultation.conclusion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Bouton pour ajouter une nouvelle consultation */}
          <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: '#0d3d6e', marginTop: 16 }}
          onClick={handleOpenAjouterConsultation}
        >
          Ajouter
        </Button>
        </Box>
       {/* Fenêtre modale pour ajouter une nouvelle consultation */}
       <Dialog open={openAjouterConsultation} onClose={handleCloseAjouterConsultation}>
        <DialogTitle>Ajouter une nouvelle consultation</DialogTitle>
        <DialogContent>
          <TextField
            label="Date de consultation"
            type="date"
            name="date_consultation"
            value={nouvelleConsultation.date_consultation}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Nom du médecin"
            name="medecin_nom"
            value={nouvelleConsultation.medecin_nom}
            disabled
            margin="normal"
            fullWidth
          />
          <TextField
            label="Prénom du médecin"
            name="medecin_prenom"
            value={nouvelleConsultation.medecin_prenom}
            disabled
            margin="normal"
            fullWidth
          />
          <TextField
            label="Conclusion"
            name="conclusion"
            value={nouvelleConsultation.conclusion}
            onChange={handleInputChange}
            margin="normal"
            fullWidth
            multiline
          />
          {/* Autres champs nécessaires */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAjouterConsultation} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleAjouterConsultation} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
      {/* Analyses */}
      <Box mb={4} id='analyse' style={{ margin : '30px'}}>
        <Typography style={{ color: '#0d3d6e' }} variant="h6" gutterBottom>
          Analyses
          <TextField
          label="Rechercher par année"
          type="number"
          style={{ marginLeft: 700 }}
          value={searchYearAnalyse}
          onChange={handleSearchYearChangeAnalyse}
        />
        </Typography>
       { <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell sx={{ color: '#0d3d6e' }}>Type d'analyse</TableCell>
                    <TableCell sx={{ color: '#0d3d6e' }}>Date de l'analyse</TableCell>
                    <TableCell sx={{ color: '#0d3d6e' }}>Nom de l'analyse</TableCell>
                    <TableCell sx={{ color: '#0d3d6e' }}>Marquer</TableCell>
                    <TableCell sx={{ color: '#0d3d6e' }}>Résultat</TableCell>
                    <TableCell sx={{ color: '#0d3d6e' }}>Unité</TableCell>
                    <TableCell sx={{ color: '#0d3d6e' }}>Norme</TableCell>
                    <TableCell sx={{ color: '#0d3d6e' }}>Autres informations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
      
              {patient.analyses.map((analyse) => (
                <TableRow
                key={analyse.id}
                style={{
                  backgroundColor: new Date(analyse.date_analyse).getFullYear() === parseInt(searchYearAnalyse) ? '#add8e6a9' : 'inherit',
                }}
              >
                <TableCell>{analyse.type_analyse}</TableCell>
                      <TableCell>{analyse.date_analyse.split('T')[0]}</TableCell>
                      <TableCell>{analyse.id_nom_analyse}</TableCell>
                      <TableCell>{analyse.marquer}</TableCell>
                      <TableCell sx={{ color: ' #3333cc', fontWeight: 'bold' }}>{analyse.resultat}</TableCell>
                      <TableCell>{analyse.unite}</TableCell>
                      <TableCell>{analyse.norme}</TableCell>
                      <TableCell>{analyse.autres_informations}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
        <Button variant="contained" color="primary" style={{ backgroundColor:'#0d3d6e' ,marginTop: 16 }}>
          Ajouter
        </Button>
      </Box>

      {/* Vaccins */}
      <Box mb={4} id='vaccin' style={{ margin : '30px'}}>
  <Typography style={{ color: '#0d3d6e' }} variant="h6" gutterBottom>
    Vaccins
    <TextField
          label="Rechercher par année"
          type="number"
          style={{ marginLeft: 700 }}
          value={searchYear}
          onChange={handleSearchYearChange}
        />
  </Typography>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom du Vaccin</TableCell>
          <TableCell>Date de Vaccination</TableCell>
          <TableCell>Remarques</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patient.vaccins.map((vaccin) => (
          <TableRow
                key={vaccin.id}
                style={{
                  backgroundColor: new Date(vaccin.date_administration).getFullYear() === parseInt(searchYear) ? '#add8e6a9' : 'inherit',
                }}
              >
            <TableCell>{vaccin.nom_vaccin}</TableCell>
            <TableCell>
              {new Date(vaccin.date_administration).toLocaleDateString()}
            </TableCell>
            <TableCell>{vaccin.remarques}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  {successMessage && (
  <Box mt={2}>
    <Typography variant="body1" style={{ color: 'green' }}>
      {successMessage}
    </Typography>
  </Box>
)}

  <Button
    variant="contained"
    color="primary" style={{ backgroundColor:'#0d3d6e' ,marginTop: 16 }}
    onClick={handleOpen}
  >
    Ajouter
  </Button>
  <Dialog open={open} onClose={handleClose} className={classes.dialog}>
    <DialogTitle>Ajouter un nouveau vaccin</DialogTitle>
    <DialogContent>
    <TextField
  label="Nom du vaccin"
  name="nom_vaccin"
  value={newVaccin.nom_vaccin}
  onChange={handleChange}
  fullWidth
  margin="normal"
  required
  error={errors.nomVaccin}
  helperText={errors.nomVaccin ? 'Ce champ est requis' : ''}
/>
<TextField
  label="Date d'administration"
  name="date_administration"
  type="date"
  value={newVaccin.date_administration}
  onChange={handleChange}
  fullWidth
  margin="normal"
  InputLabelProps={{ shrink: true }}
  required
  error={errors.dateAdministration}
  helperText={errors.dateAdministration ? 'Ce champ est requis' : ''}
/>
      <TextField
        label="Remarques"
        name="remarques"
        value={newVaccin.remarques}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Annuler</Button>
      <Button onClick={handleSubmit} className={classes.addButton}>
        Ajouter
      </Button>
    </DialogActions>
  </Dialog>
</Box>


      {/* Allergies */}
      <Box mb={4} id="allergie" style={{ margin : '30px'}}>
        <Typography style={{ color: '#0d3d6e' }} variant="h6" gutterBottom>
          Allergies
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Nom Allergie</TableCell>
              <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {patient.allergies.map((allergie) => (
              <TableRow key={allergie.id}>
                <TableCell>{allergie.nom_allergie}</TableCell>
                <TableCell>{allergie.description}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
        {successMessageAllergie && (
  <Box mt={2}>
    <Typography variant="body1" style={{ color: 'green' }}>
      {successMessageAllergie}
    </Typography>
  </Box>
)}

        <Button variant="contained" color="primary" style={{ backgroundColor:'#0d3d6e' ,marginTop: 16 }} onClick={handleOpenAllergie} >
          Ajouter
        </Button>
{/*formulaire d'ajout d'allergie
*/}
    <Dialog open={openAllergie} onClose={handleCloseAllergie} className={classes.dialog}>
    <DialogTitle>Ajouter une nouvelle allergie</DialogTitle>
    <DialogContent>
    <TextField
  label="Nom de l'allergie"
  name="nom_allergie"
  value={newAllergie.nom_allergie}
  onChange={handleChangeAllergie}
  fullWidth
  margin="normal"
  required
  error={nomAllergieError}
  helperText={nomAllergieError ? 'Le nom de l\'allergie est requis' : ''}
/>
      
      <TextField
        label="Description"
        name="description"
        value={newAllergie.description}
        onChange={handleChangeAllergie}
        fullWidth
        margin="normal"
        multiline
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseAllergie}>Annuler</Button>
      <Button onClick={handleSubmitAllergie} className={classes.addButton}>
        Ajouter
      </Button>
    </DialogActions>
  </Dialog>
      </Box>

      {/* Maladies chroniques */}
<Box mb={4} id='maladiechronique' style={{ margin : '30px'}}>
  <Typography style={{ color: '#0d3d6e' }} variant="h6" gutterBottom>
    Maladies chroniques
  </Typography>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom maladie</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patient.maladiesChroniques.map((maladie) => (
          <TableRow key={maladie.id}>
            <TableCell>{maladie.nom_maladie}</TableCell>
            <TableCell>{maladie.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
  </TableContainer>
  
  {successMessageMaladie&& (
    <Box mt={2}>
      <Typography variant="body1" style={{ color: 'green' }}>
        {successMessageMaladie}
      </Typography>
    </Box>
  )}
  <Button
    variant="contained"
    color="primary" style={{ backgroundColor:'#0d3d6e' ,marginTop: 16 }}
    onClick={handleOpenMaladie}
  >
    Ajouter
  </Button>
  {/*formulaire d'ajout d'une maladie chronique
*/}
<Dialog open={openMaladie} onClose={handleCloseMaladie} className={classes.dialog}>
    <DialogTitle>Ajouter une nouvelle maladie chronique</DialogTitle>
    <DialogContent>
    <TextField
  label="Nom de la maladie chronique"
  name="nom_maladie"
  value={newMaladie.nom_maladie}
  onChange={handleChangeMaladie}
  fullWidth
  margin="normal"
  required
  error={nomMaladieError}
  helperText={nomMaladieError ? 'Le nom de la maladie est requis' : ''}
/>
      
      <TextField
        label="Description"
        name="description"
        value={newMaladie.description}
        onChange={handleChangeMaladie}
        fullWidth
        margin="normal"
        multiline
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseMaladie}>Annuler</Button>
      <Button onClick={handleSubmitMaladie} className={classes.addButton}>
        Ajouter
      </Button>
    </DialogActions>
  </Dialog>
</Box>

      {/* Imageries */}
      <Box mb={4} id='imagerie'style={{ margin : '30px'}}>
      <Typography style={{ color: '#0d3d6e' }} variant="h6" gutterBottom>
        Imagerie médicale
        <TextField
          label="Rechercher par année"
          type="number"
          style={{marginLeft: 700 }}
          value={searchYearimagerie}
          onChange={handleSearchYearChangeimagerie}
        />
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Date de prise</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images
              .map((image) => (
                <TableRow
                key={image.id}
                style={{
                  backgroundColor: new Date(image.date_prise).getFullYear() === parseInt(searchYearimagerie) ? '#add8e6a9' : 'inherit',
                }}
              >
                  <TableCell sx={{ width: '300px' }}>
                    <img
                      src={`http://localhost:9000/uploads/${image.image.split('/').pop()}`}
                      alt={image.description}
                      style={{ maxWidth: '300px', maxHeight: '200px', cursor: 'pointer' }}
                      onClick={() => handleOpenDetails(image)}
                    />
                  </TableCell>
                  <TableCell sx={{ width: '200px' }}>{new Date(image.date_prise).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ width: '200px' }}>{image.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {successMessageimagerie && (
        <Box mt={2}>
          <Typography variant="body1" style={{ color: 'green' }}>
            {successMessageimagerie}
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary" style={{ backgroundColor:'#0d3d6e' ,marginTop: 16 }}
        onClick={handleOpenimagerie}
      >
        Ajouter
      </Button>

      {/* Modal pour ajouter une nouvelle image */}
      <Dialog open={openimagerie} onClose={handleCloseimagerie} className={classes.dialog}>
      <DialogTitle>Ajouter une nouvelle image</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            label="Description"
            value={descriptionimage}
            onChange={(e) => setDescriptionimage(e.target.value)}
            fullWidth
          />
          <TextField
  label="Date de prise"
  type="date"
  value={datePrise}
  onChange={(e) => setDatePrise(e.target.value)}
  fullWidth
  InputLabelProps={{
    shrink: true,
  }}
  required
  error={errors.datePrise}
  helperText={errors.datePrise ? 'Ce champ est requis' : ''}
/>
          <input
  type="file"
  onChange={(e) => setFile(e.target.files[0])}
  required
  error={errors.file}
/>
{errors.file && <Typography variant="caption" color="error">Ce champ est requis</Typography>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseimagerie} className={classes.cancelButton}>Annuler</Button>
        <Button onClick={handleUpload}  className={classes.addButton}>Ajouter</Button>
      </DialogActions>
    </Dialog>
      {/* Modal pour afficher les détails de l'image */}
      <Dialog open={openDetails} onClose={handleCloseDetails}>
        <DialogTitle>Détails de l'image</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <div>
              <img
                src={`http://localhost:9000/uploads/${selectedImage.image.split('/').pop()}`}
                alt={selectedImage.description}
                style={{ maxWidth: '100%' }}
              />
              <Typography variant="h6">Description: {selectedImage.description}</Typography>
              <Typography variant="h6">Date de prise: {new Date(selectedImage.date_prise).toLocaleDateString()}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
      
    </>
  )}
  
</Box>
          )}
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={classes.modal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className={classes.modalContent}>
          <Typography variant="h6" id="modal-title">
            Attention
          </Typography>
          <Typography variant="body1" id="modal-description" gutterBottom>
            Le patient avec l'email "{email}" n'existe pas dans notre base de données.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Veuillez l'inviter à s'enregistrer via l'espace patient pour pouvoir accéder à son dossier médical.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
            style={{ marginTop: '1rem' }}
          >
            Fermer
          </Button>
        </Box>
      </Modal>
      
    </>
    
  );
  <Footer />
};

export default MedecinProfil;