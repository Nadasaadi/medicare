import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import {
  Box,
  Paper,
  Typography,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Button,
} from '@mui/material';

const Imagerie = () => {
  const [images, setImages] = useState([]);
  const { user } = useAuthContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/imagerie/${user.id_patient}`);
      setImages(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchImages();
    }
  }, [user]);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ImageSection = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  
  
  }));

  const ScrollableTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: '350px', // Limite la hauteur maximale pour permettre le défilement
    overflowY: 'auto', // Ajoute une barre de défilement verticale
    marginTop: theme.spacing(2), // Ajoute un espace au-dessus du tableau
  }));

  return (
    <ImageSection>
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
            transition: 'transform 0.3s ease-in-out',
          },
          '&:hover::after': {
            transform: 'scaleX(1)',
          },
        }}
      >
        Section Imagerie médicale
      </Typography>
      <ScrollableTableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#0d3d6e' }}>Image</TableCell>
              <TableCell sx={{ color: '#0d3d6e' }}>Date de prise</TableCell>
              <TableCell sx={{ color: '#0d3d6e' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ width: '300px' }}>
                  <img
                    src={`http://localhost:9000/uploads/${image.image.split('/').pop()}`}
                    alt={image.description}
                    style={{ maxWidth: '300px', maxHeight: '200px', cursor: 'pointer' }}
                    onClick={() => handleOpen(image)}
                  />
                </TableCell>
                <TableCell sx={{ width: '200px' }}>{new Date(image.date_prise).toLocaleDateString()}</TableCell>
                <TableCell sx={{ width: '200px' }}>{image.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollableTableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            borderRadius: '5%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <img
            src={`http://localhost:9000/uploads/${selectedImage?.image.split('/').pop()}`}
            alt={selectedImage?.description}
            style={{ maxWidth: '500px', maxHeight: '80vh' }}
          />
          <Typography variant="body1" gutterBottom>
            {selectedImage?.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Date de prise: {new Date(selectedImage?.date_prise).toLocaleDateString()}
          </Typography>
          <Button onClick={handleClose} style={{ marginTop: '1rem' }}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </ImageSection>
  );
};

export default Imagerie;
