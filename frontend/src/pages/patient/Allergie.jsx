import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, styled } from '@mui/material';
import { useLoaderData, useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#3f51b5', // Modifiez la couleur selon vos préférences
});

const AllergieSection = styled('div')({
  marginTop: '24px',
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '4px',
  marginLeft :"15%"
});

const Allergie = () => {
  const allergies = useLoaderData();
  const { id_patient } = useParams();

  return (
    <AllergieSection>
      <Typography variant="h5" gutterBottom sx={{ color: '#3f51b5', position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#3f51b5', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease-in-out' }, '&:hover::after': { transform: 'scaleX(1)' } }}>
        Section Allergies
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nom Allergie</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allergies.data.map((allergie, index) => (
              <TableRow key={index}>
                <TableCell>{allergie.nom_allergie}</TableCell>
                <TableCell>{allergie.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Suivant
      </Button>
    </AllergieSection>
  );
};

export default Allergie;