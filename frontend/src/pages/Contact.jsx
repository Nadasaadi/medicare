import React, { useState } from 'react';
import '../css/Stylecontact.css';
import axios from 'axios';
import { useFontSize } from '../context/FontSizeContext';
import TextField from '@material-ui/core/TextField';
import Footer from "../components/Footer"
const CONTACT_URL = 'http://localhost:9000/contact/';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const { largeFont } = useFontSize();
  const questions = [
    { id: 1, question: "Où puis-je trouver mes résultats d'analyses ?", response: " Vos résultats d'analyses seront disponibles dans la section Analyse de votre dossier médical en ligne, généralement dans les 24 à 48 heures suivant les tests." },
    { id: 2, question: " Comment mettre à jour mes informations personnelles ?", response: " Vous pouvez mettre à jour vos informations personnelles en vous connectant à votre compte professionnel et en sélectionnant l'option Modifier les informations personnelles." },
    { id: 3, question: " Comment puis-je accéder aux dossiers médicaux de mes patients ?", response: "Vous pouvez accéder aux dossiers médicaux de vos patients en vous connectant à votre compte professionnel et chercher le patient avec son e-mail." },
    { id: 4, question: "Comment puis-je mettre à jour les Vaccins de mes patients ?", response: " Vous pouvez mettre à jour les vaccins de vos patients en recherchant le patient concerné d'aprés la barre de recherche dans votre compte professionnel, et puis vous choisissiez l'option Ajouter dans la section vaccin" },
  ];
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(selectedQuestion === questionId ? null : questionId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Vérification de la validité de l'email
        if (!emailRegex.test(email)) {
          setEmailError(true);
          return;
        }
      const response =  axios.post(CONTACT_URL, { email, message });
      console.log("Données envoyées avec succès.");
      setEmailError(false);
      setEmail(''); // Réinitialiser les champs
      setMessage('');
      setShowSuccessModal(true); // Afficher la fenêtre modale
     
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className={`container ${largeFont ? 'large-font' : ''}`}>
      <h1>Contactez-nous</h1>
      <div className="questions-container">
        <h2>Questions fréquentes</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="question" onClick={() => handleQuestionClick(question.id)}>
              <h3>{question.question}</h3>
              {selectedQuestion === question.id && <p>{question.response}</p>}
            </li>
          ))}
        </ul>
      </div>
      <div className="form-container">
        <h2>Pour d'autres questions, envoyez-nous un message</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            id="email"
            label="Email"
            placeholder='xxxx@gmail.com'
            variant="outlined"
            value={email}
            error={emailError}
            helperText={<span className="error-text">{emailError ? 'Veuillez entrer une adresse email valide.' : ''}</span>}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: '10px', marginBottom: '10px' }}
            required
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            id="message"
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ marginTop: '10px', marginBottom: '10px' }}
            required
          />
          <button type="submit" style={{ marginTop: '10px', marginBottom: '10px' }} className="submit-button">Envoyer</button>
        </form>
        {showSuccessModal && (
          <div className="success-modal" onClick={handleCloseModal}>
            <div className="modal-content">
              <p>Votre message a été envoyé avec succès!</p>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;