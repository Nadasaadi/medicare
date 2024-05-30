import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../css/Styleprofissionel.css'; // Import du fichier CSS
import axios from 'axios'; // Importez Axios
import Footer from "../../components/Footer"
import { useAuthContextMED } from "../../hooks/useAuthContextMed";


const SIGNUPM_URL = 'http://localhost:9000/medecin/signupM';
const LOGINM_URL = 'http://localhost:9000/medecin//loginM';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const AuthenticateMedecin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [adresse, setAdresse] = useState('');
  const [numero_tel, setNumero_tel] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch } = useAuthContextMED();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Supprime tous les caractères non numériques
    if (value.length <= 10) { // Limite le nombre de chiffres à 10
      setNumero_tel(value);
    }
  };
 
  const handleSpecialtyChange = (e) => setSpecialite(e.target.value === 'other' ? '' : e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setNom(e.target.value);
  const handleSurnameChange = (e) => setPrenom(e.target.value);
  const handleAddressChange = (e) => setAdresse(e.target.value);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailErrorMessage('Veuillez entrer une adresse e-mail valide.');
        return;
      }
      setEmailErrorMessage('');
  
      if (isSignUp && password !== confirmPassword) {
        setErrorMessage('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
        return;
      }
  
      const payload = {
        email, password, nom, prenom, specialite, adresse, numero_tel
      };
  
      const url = isSignUp ? SIGNUPM_URL : LOGINM_URL;
      const response = await axios.post(url, payload);
  
      if (response.data) {
        dispatch({ type: "loginM", payload: response.data });
        localStorage.setItem("medecin", JSON.stringify(response.data));
      }
    } catch (error) {
      if (error.response) {

          setErrorMessage('L\'adresse e-mail est déjà utilisée.');
        
      } else {
        console.error('Error while submitting the form:', error);
      }
    }
  };
  
  const getPasswordErrorMessage = () => {
    if (isSignUp) {
      if (password.length < 8) {
        return <p style={{color:'red'}}>Le mot de passe doit contenir au moins 8 caractères.</p>
      } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        return <p style={{color:'red'}}>Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.</p>
      } else if (!passwordRegex.test(password)) {
        return <p style={{color:'orange'}}>Le mot de passe doit contenir au moins un caractère spécial.</p>
      } else {
        return <p style={{color:'green'}}>Mot de passe valide.</p>
      }
    }
    return '';
  };


  return (
    <>
      <div className='professional-page'>
        <div className="form-section">
          <h1>Bienvenue dans notre espace professionnel!</h1>
          <form onSubmit={handleFormSubmit}>
            {isSignUp && (
              <>
                <TextField
                  type="text"
                  label="Nom"
                  value={nom}
                  onChange={handleNameChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: { paddingLeft: '8px' }
                  }}
                />
                <TextField
                  type="text"
                  label="Prénom"
                  value={prenom}
                  onChange={handleSurnameChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: { paddingLeft: '8px' }
                  }}
                />
           <TextField
                type="text"
                label="Spécialité"
                value={specialite}
                onChange={handleSpecialtyChange}
                variant="outlined"
                fullWidth
                required
                InputProps={{
        style: { paddingLeft: '8px' } // Ajoute une marge intérieure de 8 pixels à gauche du texte
    }}
              />
                <TextField
                  type="text"
                  label="Adresse"
                  value={adresse}
                  onChange={handleAddressChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: { paddingLeft: '8px' }
                  }}
                />
                 <TextField
                type="tel"
                label="Numéro de téléphone"
                value={numero_tel}
                onChange={handlePhoneNumberChange}
                variant="outlined"
                fullWidth
                required
                InputProps={{
        style: { paddingLeft: '8px' } // Ajoute une marge intérieure de 8 pixels à gauche du texte
    }}
              />
              </>
            )}
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              placeholder="XXXX@gmail.com"
              fullWidth
              InputProps={{
                style: { paddingLeft: '8px',height:'50px' }
              }}
              required
            />
            <TextField
              type={showPassword ? "text" : "password"}
              label="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              fullWidth
              required
              InputProps={{
                style: { paddingLeft: '8px' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: 0, bottom: 0, top: 0 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
             <p>{getPasswordErrorMessage()}</p>
            {isSignUp && (
              <TextField
                type={showPassword ? "text" : "password"}
                label="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  style: { paddingLeft: '8px' }
                }}
              />
            )}
            <Button className='login-bouton' type="submit" variant="contained" color="primary">
              {isSignUp ? 'S\'inscrire' : 'Se connecter'}
            </Button>
          </form>
          <Button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas encore de compte ? S\'inscrire'}
          </Button>
          {errorMessage && (<p className="error-message">{errorMessage}</p>)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthenticateMedecin;
