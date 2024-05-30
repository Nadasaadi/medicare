import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, styled, Box } from '@mui/material';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#0d3d6e', // Customize the color as needed
});

const AllergieSection = styled('div')({
  marginTop: '24px',
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '4px',
  marginLeft: '15%',
  marginRight: '15%', // Center the section
  maxWidth: '70%', // Limit the maximum width
});

const ScrollableTableContainer = styled(TableContainer)({
  maxHeight: '60vh', // Limit the maximum height for scrolling
  overflowY: 'auto', // Add vertical scrollbar
  marginTop: '16px', // Add margin above the table
});

const Allergie = () => {
  const allergies = useLoaderData();
  const { id_patient } = useParams();
  const navigate = useNavigate();

  return (
    <AllergieSection>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          color: '#0d3d6e', 
          position: 'relative', 
          display: 'inline-block', 
          '&::after': { 
            content: '""', 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            height: '2px', 
            backgroundColor: '#0d3d6e', 
            transform: 'scaleX(0)', 
            transformOrigin: 'left', 
            transition: 'transform 0.3s ease-in-out' 
          }, 
          '&:hover::after': { 
            transform: 'scaleX(1)' 
          } 
        }}
      >
        Section Allergies
      </Typography>
      <ScrollableTableContainer component={Paper}>
        <Table stickyHeader>
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
      </ScrollableTableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '16px'
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(`/espace-patient/maladie/${id_patient}`)}
          sx={{ backgroundColor: '#26527d' }}
        >
          Suivant
        </Button>
      </Box>
    </AllergieSection>
  );
};

export default Allergie;
