import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, styled, Modal, Box } from '@mui/material';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#0d3d6e', // Modifiez la couleur selon vos préférences
});

const ConsultationSection = styled('div')({
  marginTop: '24px',
  backgroundColor: '#f5f5f5',
  padding: '16px',
  marginLeft: '20px', // Centre horizontalement avec une marge supérieure de 24px
  borderRadius: '4px',
  width: '800px', // Limite la largeur maximale
});

const ScrollableTableContainer = styled(TableContainer)({
  maxHeight: '300px', // Limite la hauteur maximale pour le défilement
  overflowY: 'auto', // Ajoute une barre de défilement verticale
});

const Consultation = () => {
  const consultations = useLoaderData();
  const { id_patient } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMedecin, setSelectedMedecin] = useState(null);

  const handleOpenModal = (medecin) => {
    setSelectedMedecin(medecin);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMedecin(null);
    setOpenModal(false);
  };

  return (
    <ConsultationSection>
      <Typography variant="h5" gutterBottom sx={{ color: '#0d3d6e', position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#0d3d6e', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease-in-out' }, '&:hover::after': { transform: 'scaleX(1)' } }}>
        Section des consultations
      </Typography>
      <ScrollableTableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date consultation</StyledTableCell>
              <StyledTableCell>Médecin consultant</StyledTableCell>
              <StyledTableCell>Conclusion</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultations && consultations.data ? (
              consultations.data.map((consultation, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(consultation.date_consultation).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenModal(consultation)}>
                      {consultation.medecin_nom} {consultation.medecin_prenom}
                    </Button>
                  </TableCell>
                  <TableCell>{consultation.conclusion}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>Aucune consultation trouvée.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollableTableContainer>
      <Button variant="contained" onClick={() => navigate(`/espace-patient/analyse/${id_patient}`)} style={{ marginTop: '16px', backgroundColor: '#26527d' }}>
        Suivant
      </Button>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Button onClick={handleCloseModal} style={{ position: 'absolute', top: '8px', right: '8px' }}>
            <CloseIcon />
          </Button>

          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Profil du médecin
          </Typography>
          {selectedMedecin && (
            <Typography id="modal-description" sx={{ mt: 2 }}>
              <strong>Nom:</strong> {selectedMedecin.medecin_nom} <br />
              <strong>Prénom:</strong> {selectedMedecin.medecin_prenom} <br />
              <strong>Email:</strong> {selectedMedecin.medecin_email} <br />
              <strong>Spécialité:</strong> {selectedMedecin.medecin_specialite} <br />
              <strong>Adresse:</strong> {selectedMedecin.medecin_adresse} <br />
              <strong>Numéro de téléphone:</strong> {selectedMedecin.medecin_numero_tel} <br />
            </Typography>
          )}
        </Box>
      </Modal>
    </ConsultationSection>
  );
};

export default Consultation;
