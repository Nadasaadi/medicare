import React, { useState,useContext } from 'react';
import imageform from "../assets/la-personne.png";
import { AuthContext } from '../context/AuthContext';

import axios from 'axios'; // Importez Axios
import { useAuthContext } from "../hooks/useAuthContext";
const SIGNUP_URL = 'http://localhost:9000/user/signup';
const LOGIN_URL = 'http://localhost:9000/user/login';

function Patient() {
  // update user context 
  const {dispatch} = useAuthContext()
  // State variables to store input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewMember, setIsNewMember] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date_naissance, setDate_naissance] = useState('');
  const [sexe, setSexe] = useState('M');
  const [lieu_naissance, setLieu_naissance] = useState('');
  const [showWelcome, setShowWelcome] = useState(true); // Déclaration de la variable showWelcome
  const [emailError, setEmailError] = useState('')
  // Déclarez un état pour stocker le message d'erreur
const [errorMessage, setErrorMessage] = useState('');
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       // Validation de l'e-mail
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(email)) {
        {emailError && <p className="error-message">{emailError}</p>}
         setEmailError('Veuillez entrer une adresse e-mail valide.');
         return;
       }
 
       // Si l'e-mail est valide, réinitialiser l'erreur d'e-mail
       setEmailError('');
      if (isNewMember) {
        // Logic for signing up
        const response = await axios.post(SIGNUP_URL, {
          email,
          password,
          nom,
          prenom,
          date_naissance,
          sexe,
          lieu_naissance,
        });
        if(response.data){
          dispatch({type: "login", payload: response.data});
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } else {
        // Logic for logging in
        const response = await axios.post(LOGIN_URL, {
          email,
          password,
        });
        if(response.data){
          dispatch({type: "login", payload: response.data});
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      }
   // Navigate to another page after login/signup
  } catch (error) {
    if (error.response) {
      setErrorMessage('L\'adresse e-mail existe déjà. Veuillez vous connecter ou utiliser une autre adresse e-mail.');
    } else {
      console.error('Error while submitting the form:', error.response.data);
    }
  }
  };

  return (
    <>
    {showWelcome && (
      <div className="welcome-text">
        Bienvenue dans notre espace patient!
      </div>
    )}
    <div className="patient-page-container">
    <div className="health-image">
    <img src={imageform}  alt="Image santé"  />
    </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group-patient">
          <label><span className="required">*</span>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className="form-control" 
            placeholder="XXXX@gmail.com"
            required
          />
          
          {emailError && <p className="error-message">{emailError}</p>}
          {errorMessage && (<p className="error-message">{errorMessage}</p> )}
        </div>
        <div className="form-group-patient">
          <label><span className="required">*</span>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        {isNewMember && (
          <>
            <div className="form-group-patient">
              <label><span className="required">*</span>Nom:</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="form-control"
                required
              />

            </div>
            <div className="form-group-patient">
              <label><span className="required">*</span>Prénom:</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group-patient">
              <label><span className="required">*</span>Date naissance:</label>
              <input
                type="date"
                value={date_naissance}
                onChange={(e) => setDate_naissance(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group-patient">
              <label><span className="required">*</span>Sexe:</label>
              <select
                value={sexe}
                onChange={(e) => setSexe(e.target.value)}
                className="form-control"
                required
              >
                <option value="M">Homme</option>
                <option value="F">Femme</option>
              </select>
            </div>
            <div className="form-group-patient">
              <label><span className="required">*</span>Lieu naissance:</label>
              <input
                type="text"
                value={lieu_naissance}
                onChange={(e) => setLieu_naissance(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </>
        )}
        <div className="form-group-patient">
          <input
            type="checkbox"
            checked={isNewMember}
            onChange={(e) => setIsNewMember(e.target.checked)}
            className="form-check-input"
          />
          <label className="form-check-label">Inscrivez-vous en tant que nouveau membre</label>
        </div>
        <button type="submit" className="btn btn-primary">
          {isNewMember ? 'Sign Up' : 'Log In'}
        </button>
      </form>
    </div>
    </>
  );
}

export default Patient;
