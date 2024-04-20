// Contact.js

import React, { useState } from 'react';
import './Stylecontact.css'; // Import du fichier CSS

const Contact = () => {
  const questions = [
    { id: 1, question: "Où puis-je trouver mes résultats d'analyses ?", response: " Vos résultats d'analyses seront disponibles dans la section Analyse de votre dossier médical en ligne, généralement dans les 24 à 48 heures suivant les tests." },
    { id: 2, question: " Comment mettre à jour mes informations personnelles ?", response: " Vous pouvez mettre à jour vos informations personnelles en vous connectant à votre compte patient et en sélectionnant l'option Modifier les informations personnelles." },
    { id: 3, question: " Comment puis-je accéder aux dossiers médicaux de mes patients ?", response: "Vous pouvez accéder aux dossiers médicaux de vos patients en vous connectant à votre compte professionnel et chercher le petient avec son nom et prénom." },
    { id: 4, question: "Comment puis-je mettre à jour les Allergies médicaux de mes patients ?", response: " Vous pouvez mettre à jour les antécédents médicaux de vos patients en sélectionnant le patient concerné dans votre compte professionnel et en utilisant l'option Modifier dans la section allergie" },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(selectedQuestion === questionId ? null : questionId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Message:", message);
    setEmail('');
    setMessage('');
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleInputFocus = (setter) => {
    setter(true);
  };

  const handleInputBlur = (setter) => {
    setter(false);
  };

  return (
    <div className="container">
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
          <div className={`input-group ${emailFocused || email ? "focused" : ""}`}>
            <input
              type="email"
              id="email"
              className="email-input"
              value={email}
              placeholder=' '
              onFocus={() => handleInputFocus(setEmailFocused)}
              onBlur={() => handleInputBlur(setEmailFocused)}
              onChange={(e) => handleInputChange(e, setEmail)}
              required
            />
            <label htmlFor="email">Email </label>
          </div>
          <div className={`input-group ${messageFocused || message ? "focused" : ""}`}>
            <textarea
              id="message"
              className="message-input"
              value={message}
              onFocus={() => handleInputFocus(setMessageFocused)}
              onBlur={() => handleInputBlur(setMessageFocused)}
              onChange={(e) => handleInputChange(e, setMessage)}
              required
              placeholder=' '
            ></textarea>
            <label htmlFor="message">Message </label>
          </div>
          <button type="submit" className="submit-button">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
