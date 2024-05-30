import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button, Typography, Divider, Avatar, Box, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Importez les images
import anonymousAvatarHomme from '../../assets/anonymous_avatars_grey_circleshomme-removebg-preview.png';
import anonymousAvatarFemme from '../../assets/anonymous_avatars_grey_circlesfemme-removebg-preview.png';

const Profil = () => {
  const { user } = useAuthContext();
  const { id_patient, nom, prenom, sexe, date_naissance, lieu_naissance } = user;
  const navigate = useNavigate();

  const getSexeLabel = () => {
    if (sexe === 'M') {
      return 'Homme';
    } else if (sexe === 'F') {
      return 'Femme';
    } else {
      return 'Non spécifié';
    }
  };

  const getSexeIcon = () => {
    return sexe === 'M' ? <MaleIcon /> : <FemaleIcon />;
  };

  // Fonction pour obtenir la photo par défaut en fonction du sexe
  const getDefaultAvatar = () => {
    if (sexe === 'M') {
      return anonymousAvatarHomme;
    } else if (sexe === 'F') {
      return anonymousAvatarFemme;
    } else {
      // Vous pouvez choisir une image par défaut pour les autres cas
      return '';
    }
  };

  return (
    <Box mt={9}>
      <Card style={{ width: '50rem' }}>
        <CardHeader
          avatar={
            <Avatar
              src={user.photo || getDefaultAvatar()}
              sx={{
                width: 100,
                height: 100,
                marginTop: -2,
                '& .MuiAvatar-img': {
                  objectFit: 'cover',
                },
              }}
            />
          }
          sx={{ paddingBottom: 0, backgroundColor: '#26527d', paddingTop: 5 }}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
            <Typography variant="h6" fontWeight="bold" color="#003366">
              {nom} {prenom}
            </Typography>
            <Box display="flex" alignItems="center">
              {getSexeIcon()}
              <Typography variant="body1" ml={1}>
                Sexe : {getSexeLabel()}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <CalendarTodayIcon />
            <Typography variant="body1" ml={1}>
              Date de naissance : {new Date(date_naissance).toLocaleDateString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOnIcon />
            <Typography variant="body1" ml={1}>
              Lieu de naissance : {lieu_naissance}
            </Typography>
          </Box>
          <Button
            variant="contained"
            
            onClick={() => navigate(`/espace-patient/consultation/${id_patient}`)}
            style={{ marginLeft: '40rem' , backgroundColor : '#26527d'}}
          >
            Suivant
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profil;