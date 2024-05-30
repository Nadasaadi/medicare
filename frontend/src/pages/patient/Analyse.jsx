import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData, useParams } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Analyse = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const { id_patient } = useParams();
  const analyse = useLoaderData();

  // Regrouper les analyses par type
  const analysesByType = analyse.data.reduce((acc, ana) => {
    const { type_analyse } = ana;
    if (!acc[type_analyse]) {
      acc[type_analyse] = [];
    }
    acc[type_analyse].push(ana);
    return acc;
  }, {});

  return (
    <Box sx={{ maxWidth: '80vw', margin: '0 auto', display: 'flex' }}  className='analyse'>
      <Box sx={{ flex: '0 0 90px' }}></Box> {/* Espace réservé à gauche */}
      <Box sx={{ flex: '1 1 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#0d3d6e', position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#3f51b5', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease-in-out' }, '&:hover::after': { transform: 'scaleX(1)' } }}>
            Section Analyses
          </Typography>
        </Box>
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {Object.entries(analysesByType).map(([type, analyses]) => (
            <Box key={type} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#0d3d6e' }}>
                {type}
              </Typography>
              <TableContainer component={Paper}>
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
                    {analyses.map((ana, index) => (
                      <TableRow key={index}>
                        <TableCell>{ana.type_analyse}</TableCell>
                        <TableCell>{ana.date_analyse.split('T')[0]}</TableCell>
                        <TableCell>{ana.nom_analyse}</TableCell>
                        <TableCell>{ana.marquer}</TableCell>
                        <TableCell sx={{ color: '#3f51b5', fontWeight: 'bold' }}>{ana.resultat}</TableCell>
                        <TableCell>{ana.unite}</TableCell>
                        <TableCell>{ana.norme}</TableCell>
                        <TableCell>{ana.autres_informations}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate(`/espace-patient/vaccin/${id_patient}`)}
          sx={{ marginTop: "20px", marginBottom: '30px', marginLeft: 'auto', backgroundColor: '#26527d' }}
        >
          Suivant
        </Button>
      </Box>
    </Box>
  );
};

export default Analyse;
