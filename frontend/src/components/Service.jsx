import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, useTheme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PortraitIcon from '@mui/icons-material/Portrait';
import ShareIcon from '@mui/icons-material/Share';
import AllergyIcon from '@mui/icons-material/AllInclusive';
import backgroundImage from '../assets/Free Photo _ Stethoscope and copy space.jpg';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: theme.spacing(2),
        color: '#4c4c4c',
        animation: '$titleAnimation 1s ease-in-out',
      },
      '@keyframes titleAnimation': {
        '0%': {
          transform: 'scale(0.8)',
          opacity: 0,
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 1,
        },
      },
      card: {
        transition: 'all 0.3s ease-in-out',
        height: '200px',
        width: '200px',
       // backgroundColor:'none',
        margin: '50px',
        justifyContent: 'space-evenly',
        padding: theme.spacing(2),
        borderRadius: '30%',
      },
      icon: {
        fontSize: '1rem',
        color: '#0d3d6e',
        marginBottom: theme.spacing(1),
      //  borderRadius : '30px',
        transition: 'color 0.3s ease-in-out',
      },
      cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      },
      backgroundContainer: {
       backgroundImage: `url(${backgroundImage})`,
       backgroundSize: 'cover',
       // backgroundPosition: 'center',
        padding: theme.spacing(1),
      },
      activeCard: {
        transform: 'scale(1.1)',
        backgroundColor: '#0d3d6e !important', // Changement de couleur de fond
        border: '1px solid white', // Ajout d'une bordure noire de 1px
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        
      },
      activeCardText: {
        color: 'white',
      },
      activeCardIcon: {
        color: 'white',
      },
      dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'gray',
        margin: '0 5px',
      },
      activeDot: {
        backgroundColor: 'black',
      },
    }));

const Service = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const services = [
    {
      title: 'Gestion des dossiers médicaux électroniques',
      icon: <FolderSharedIcon className={classes.icon} />,
    },
    {
      title: 'Portails patients',
      icon: <PortraitIcon className={classes.icon} />,
    },
    {
      title: 'Partage sécurisé des informations médicales',
      icon: <ShareIcon className={classes.icon} />,
    },
    {
      title: 'Gestion des allergies et des intolérances',
      icon: <AllergyIcon className={classes.icon} />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000); // Changez la valeur pour ajuster la vitesse de l'animation

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <Box className={classes.backgroundContainer}>
      <Typography variant="h2" className={classes.title}>
        Nos services
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              className={`${classes.card} ${index === activeIndex ? classes.activeCard : ''}`}
            >
              <CardContent className={classes.cardContent}>
                {React.cloneElement(service.icon, {
                  className: `${classes.icon} ${index === activeIndex ? classes.activeCardIcon : ''}`,
                })}
                <Typography
                  variant="h6"
                  component="h3"
                  className={index === activeIndex ? classes.activeCardText : ''}
                >
                  {service.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2}>
        {services.map((_, index) => (
          <div
            key={index}
            className={`${classes.dot} ${index === activeIndex ? classes.activeDot : ''}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Service;