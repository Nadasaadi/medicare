import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,TextField } from '@material-ui/core';
import '../css/AdminStyle.css'; // Import du fichier CSS
import { useNavigate } from 'react-router-dom';
import { Margin } from '@mui/icons-material';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import {  Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  termConditionItem: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  termConditionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  termConditionId: {
    fontWeight: 'bold',
  },
  termConditionText: {
    whiteSpace: 'pre-wrap',
  },
}));


const MESSAGE_URL = 'http://localhost:9000/message/';
const PRIVACY_POLICY_URL = 'http://localhost:9000/privacyPolicy'; // URL pour récupérer et mettre à jour la politique de confidentialité
const TERM_URL ='http://localhost:9000/termCondition';

const AdminPage = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const navigate = useNavigate();
  const handleCancelEditing = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    // Supprimez le jeton d'authentication du localStorage ou de tout autre endroit où vous le stockez
    localStorage.removeItem('authToken');

    // Redirigez l'utilisateur vers la page de connexion ou toute autre page appropriée
    navigate('/');
  };

  // Dans la fonction fetchMessages
  const fetchMessages = async () => {
    try {
      const response = await axios.get(MESSAGE_URL);
      const unreadMessages = response.data.filter(message => !message.Read);
      setMessages(response.data);
      setUnreadMessagesCount(unreadMessages.length);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  


  // Function to mark a message as read

  const markAsRead = (id) => {
    // Mettre à jour localement l'état des messages pour refléter le changement
    const updatedMessages = messages.map(message => {
      if (message.ID === id) {
        return { ...message, Read: true };
      }
      return message;
    });
    setMessages(updatedMessages);
  
    // Mettre à jour le compteur de messages non lus
    const unreadMessages = updatedMessages.filter(message => !message.Read);
    setUnreadMessagesCount(unreadMessages.length);
  };


  const deleteMessage = async (id, isRead) => {
    if (!isRead) {
      const confirmDelete = window.confirm('Vous êtes sur le point de supprimer un message non lu. Voulez-vous continuer ?');
      if (!confirmDelete) {
        return; // Annuler la suppression si l'utilisateur ne confirme pas
      }
    }
  
    try {
      // Supprimer le message sur le serveur
      const response = await axios.delete(`http://localhost:9000/message/${id}`);
  
      if (response.status === 200) {
        // Supprimer le message localement
        setMessages(prevMessages => prevMessages.filter(message => message.ID !== id));
  
        // Mettre à jour le compteur de messages non lus après la suppression
        const updatedMessages = messages.filter(message => message.ID !== id);
        const unreadMessages = updatedMessages.filter(message => !message.Read);
        setUnreadMessagesCount(unreadMessages.length);
      } else {
        console.error('Error deleting message:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
// Fetch messages on component mount
useEffect(() => {
  fetchMessages();
}, []);



//gestion des termes et condition 
const [isEditingTerm, setIsEditingTerm] = useState(false);
const [editingTermId, setEditingTermId] = useState(null);
const [newTermCondition, setNewTermCondition] = useState('');
const [isLoadingTerm, setIsLoadingTerm] = useState(true)
const [termCondition, setTermCondition] = useState([]);


// Function to fetch terms and conditions from the backend
const fetchTermCondition = async () => {
  try {
    setIsLoadingTerm(true);
    const response = await axios.get(TERM_URL);

    setTermCondition(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des termes et conditions :', error);
  } finally {
    setIsLoadingTerm(false);
  }
};

// Function to update terms and conditions
const updateTermCondition = async (id, texte) => {
  try {
    const response = await axios.put(`${TERM_URL}/${id}`, { texte });
    if (response.status === 200) {
      fetchTermCondition(); // Récupérer les nouveaux termes et conditions
      setIsEditingTerm(false);
      setNewTermCondition('');
      setEditingTermId(null);
    } else {
      console.error('Erreur lors de la mise à jour des termes et conditions :', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des termes et conditions :', error);
  }
};
//function to delete terms
const deleteTermCondition = async (id) => {
  try {
    const response = await axios.delete(`${TERM_URL}/${id}`);
    if (response.status === 200) {
      fetchTermCondition(); // Récupérer les nouveaux termes et conditions après suppression
    } else {
      console.error('Erreur lors de la suppression des termes et conditions :', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression des termes et conditions :', error);
  }
};
//function to add terms
const addTermCondition = async () => {
  try {
    const response = await axios.post(TERM_URL, { texte: newTermCondition });
    if (response.status === 201) {
      fetchTermCondition(); // Récupérer les nouveaux termes et conditions
      setIsEditingTerm(false);
      setNewTermCondition('');
    } else {
      console.error('Erreur lors de l\'ajout des termes et conditions :', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout des termes et conditions :', error);
  }
};


   // Récupérer la politique de confidentialité au chargement du composant
   useEffect(() => {
     fetchTermCondition();
   }, []);


 // Gestion de la politique de confidentialité
 const [isEditingPrivacy, setIsEditingPrivacy] = useState(false);
 const [privacyPolicy, setPrivacyPolicy] = useState([]);
 const [newPrivacyPolicy, setNewPrivacyPolicy] = useState('');
 const [isLoadingPrivacy, setIsLoadingPrivacy] = useState(true);
 const [editingPolicyId, setEditingPolicyId] = useState(null);
 // Fonction pour récupérer la politique de confidentialité depuis le backend
 const fetchPrivacyPolicy = async () => {
  try {
    setIsLoadingPrivacy(true);
    const response = await axios.get(PRIVACY_POLICY_URL);
    setPrivacyPolicy(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération de la politique de confidentialité :', error);
  } finally {
    setIsLoadingPrivacy(false);
  }
};
// Function to update politique de confidentialité
const updatePrivacyPolicy = async (id, texte) => {
  try {
    const response = await axios.put(`${PRIVACY_POLICY_URL}/${id}`, { texte });
    if (response.status === 200) {
      fetchPrivacyPolicy(); // Récupérer les nouveaux termes et conditions
      setIsEditingPrivacy(false);
      setNewPrivacyPolicy('');
      setEditingPolicyId(null);
    } else {
      console.error('Erreur lors de la mise à jour des politiques de confidentialtés :', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des politiques de confidentialités :', error);
  }
};
//function to delete privacy policy
const deletePrivacyPolicy = async (id) => {
  try {
    const response = await axios.delete(`${PRIVACY_POLICY_URL}/${id}`);
    if (response.status === 200) {
      fetchPrivacyPolicy(); // Récupérer les nouveaux politiques après suppression
    } else {
      console.error('Erreur lors de la suppression de politique de confidentialité :', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de politique de confidentialité :', error);
  }
};
//function to add privacy policy
const addPrivacyPolicy = async () => {
  try {
    const response = await axios.post(PRIVACY_POLICY_URL, { texte: newPrivacyPolicy });
    if (response.status === 201) {
      fetchPrivacyPolicy(); // Récupérer les nouveaux politiques
      setIsEditingPrivacy(false);
      setNewPrivacyPolicy('');
    } else {
      console.error('Erreur lors de l\'ajout de politique de confidentialité :', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout des politiques de confidentialités :', error);
  }
};


 // Récupérer la politique de confidentialité au chargement du composant
 useEffect(() => {
   fetchPrivacyPolicy();
 }, []);

  return (
    <div>
      <nav className="navbar">
        {/* Navigation links */}
        <ul className="navbar__list">
          <li className="navbar__item"><a className="navbar__link" href="#messages">Messages   {unreadMessagesCount > 0 && <span className="badge">{unreadMessagesCount}</span>}</a></li>
          <li className="navbar__item"><a className="navbar__link" href="#terms">Termes et conditions</a></li>
          <li className="navbar__item"><a className="navbar__link" href="#privacy">Politique de confidentialité</a></li>
          <li className="navbar__item">
             <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
            </li>
        </ul>
      </nav>


      
{/* Messages Section */}
      <section id="messages">
        <h2 className='titre-section'>Messages</h2>
        <TableContainer className="table-container"  component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contenu</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>lu</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Array.isArray(messages) && messages.map(message => (
    <TableRow key={message.ID} style={{ backgroundColor: message.Read ? 'inherit' : '#aed6f141' }}>
      <TableCell>{message.ID}</TableCell>
      <TableCell>{message.Email}</TableCell>
      <TableCell>{message.Message}</TableCell>
      <TableCell>{new Date(message.DateEnvoi).toLocaleDateString()}</TableCell>
      <TableCell>{message.Read ? 'Oui' : 'Non'}</TableCell>
      <TableCell>
  <Button onClick={() => markAsRead(message.ID)}>marqué comme lu</Button>
  <Button onClick={() => deleteMessage(message.ID, message.Read)}>Supprimer</Button>
</TableCell>
       
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </section>
      <div>




{/* Terms & Conditions Section */}
<section id="terms">
  <h2 className="titre-section">Terms & Conditions</h2>
  {isEditingTerm ? (
    <div className="content">
      <TextField
        multiline
        fullWidth
        style={{ width: '100%' }}
        value={newTermCondition}
        onChange={(e) => setNewTermCondition(e.target.value)}
      />
      <div className="edit-buttons">
        {editingTermId === null ? (
          <Button  onClick={addTermCondition}>Ajouter</Button>
        ) : (
          <Button onClick={() => updateTermCondition(editingTermId, newTermCondition)}>Enregistrer</Button>
        )}
        <Button onClick={handleCancelEditing}>Annuler</Button>
      </div>
    </div>
  ) : (
    <div className="content">
      {isLoadingTerm ? (
        <p>Chargement des termes et conditions...</p>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsEditingTerm(true);
              setEditingTermId(null);
              setNewTermCondition('');
            }}
            style={{marginBottom:10}}
          >
            Ajouter
          </Button>
          {termCondition.map((element, index) => (
            <Paper key={index} className={classes.termConditionItem} elevation={3}>
              <Box className={classes.termConditionHeader}>
                <Typography variant="subtitle1" className={classes.termConditionId}>
                  ID : {element.id}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setIsEditingTerm(true);
                      setEditingTermId(element.id);
                      setNewTermCondition(element.texte);
                    }}
                  >
                      Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteTermCondition(element.id)}
                    style={{ marginLeft: '8px' }}
                  >
                    Supprimer
                  </Button>
                </div>
              </Box>
              <Typography variant="body1" className={classes.termConditionText}>
                {element.texte}
              </Typography>
            </Paper>
          ))}
        </>
      )}
    </div>
  )}
</section>


</div>

    <Modal
  isOpen={showModal}
  onRequestClose={() => setShowModal(false)}
  contentLabel="Annuler les modifications"
  style={{
    content: {
      width: '300px',
      height: '200px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
  }}
>
  <h2>Êtes-vous sûr de vouloir annuler les modifications ?</h2>
  <div>
    <button
      style={{
        backgroundColor: 'white',
        color: 'red',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        marginRight: '10px',
        cursor: 'pointer',
      }}
      onClick={() => setShowModal(false)}
    >
      Non
    </button>
    <button
      style={{
        backgroundColor: 'white',
        color: 'green',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={() => {
        setIsEditingPrivacy(false);
        setIsEditingTerm(false);
        setNewPrivacyPolicy('');
        setShowModal(false);
      }}
    >
      Oui
    </button>
  </div>
</Modal>

         {/* privacy policy Section */}
         <section id="privacy">
        <h2 className="titre-section">Politique de confidentialité</h2>
        {isEditingPrivacy ? (
          <div className="content">
            <TextField
              multiline
              fullWidth
              style={{ width: '100%' }}
              value={newPrivacyPolicy}
              onChange={(e) => setNewPrivacyPolicy(e.target.value)}
            />
            <div className="edit-buttons">
            {editingPolicyId === null ? (
          <Button onClick={addPrivacyPolicy}>Ajouter</Button>
        ) : (
          <Button onClick={() => updatePrivacyPolicy(editingPolicyId, newPrivacyPolicy)}>Enregistrer</Button>
        )}
        <Button onClick={handleCancelEditing}>Annuler</Button>
      </div>
    </div>
  ) : (
    <div className="content">
      {isLoadingPrivacy ? (
        <p>Chargement des politiques de confidentialité...</p>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsEditingPrivacy(true);
              setEditingPolicyId(null);
              setNewPrivacyPolicy('');
            }}
            style={{marginBottom:10}}
          >
            Ajouter
          </Button>
          {privacyPolicy.map((element, index) => (
            <Paper key={index} className={classes.termConditionItem} elevation={3}>
              <Box className={classes.termConditionHeader}>
                <Typography variant="subtitle1" className={classes.termConditionId}>
                  ID : {element.id}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setIsEditingPrivacy(true);
                      setEditingPolicyId(element.id);
                      setNewPrivacyPolicy(element.texte);
                    }}
                  >
                      Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deletePrivacyPolicy(element.id)}
                    style={{ marginLeft: '8px' }}
                  >
                    Supprimer
                  </Button>
                </div>
              </Box>
              <Typography variant="body1" className={classes.termConditionText}>
                {element.texte}
              </Typography>
            </Paper>
          ))}
        </>
      )}
    </div>
  )}
</section>


  </div>
);
};

export default AdminPage;