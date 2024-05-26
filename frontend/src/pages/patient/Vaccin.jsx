// Importation des composants React nécessaires depuis les bibliothèques MUI et react-router-dom
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, styled } from '@mui/material';
import { useLoaderData, useParams,useNavigate } from 'react-router-dom';


// Définition d'un TableCell personnalisé avec des styles spécifiques
const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#0d3d6e', // Modifiez la couleur selon vos préférences
});

// Définition d'une section de style pour les informations sur les vaccins
const VaccinSection = styled('div')({
  marginTop: '24px',
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '4px',
});

// Définition du composant fonctionnel Vaccin
const Vaccin = () => {
  
const navigate = useNavigate();
  // Récupération des données des vaccins à partir du hook useLoaderData
  const vaccins = useLoaderData();
  // Récupération des paramètres d'URL à partir du hook useParams
  const { id_patient } = useParams();

  // Rendu du composant Vaccin
  return (
    <VaccinSection>
      {/* Titre de la section des vaccins avec un effet de survol */}
      <Typography variant="h5" gutterBottom sx={{ color: '#0d3d6e', position: 'relative', display: 'inline-block', 
      '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', 
      backgroundColor: '#0d3d6e', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease-in-out' }, 
      '&:hover::after': { transform: 'scaleX(1)' } }}>
        Section Vaccins
      </Typography>
      {/* Tableau affichant les données des vaccins */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* En-têtes de colonne personnalisées avec le composant StyledTableCell */}
              <StyledTableCell>Nom du Vaccin</StyledTableCell>
              <StyledTableCell>Date de Vaccination</StyledTableCell>
              <StyledTableCell>Remarques</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapping des données des vaccins pour afficher chaque entrée dans une ligne du tableau */}
            {vaccins.data.map((vaccin, index) => (
              <TableRow key={index}>
                <TableCell>{vaccin.nom_vaccin}</TableCell>
                <TableCell>{new Date(vaccin.date_administration).toLocaleDateString()}</TableCell>
                <TableCell>{vaccin.remarques}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Bouton Suivant */}
      <Button
  variant="contained"
  onClick={() => navigate(`/espace-patient/allergie/${id_patient}`)}
  sx={{ marginTop: "20px", marginLeft: 'auto',backgroundColor : '#26527d' }}
>
  Suivant
</Button>
    </VaccinSection>
  );
};

// Exportation du composant Vaccin pour pouvoir l'utiliser dans d'autres fichiers de l'application
export default Vaccin;
