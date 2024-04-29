import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFontSize } from '../../context/FontSizeContext';
import '../../css/Styleprofissionel.css'; // Import du fichier CSS
import axios from 'axios'; // Importez Axios
const SIGNUPM_URL = 'http://localhost:9000/medecin/signupM';
const LOGINM_URL = 'http://localhost:9000/medecin/loginM';
const AuthenticateMedecin = () => {
  const { largeFont } = useFontSize();
  // update user context 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [adresse, setAdresse] = useState('');
  const [numero_tel, setNumero_tel] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
// Déclarez un état pour stocker le message d'erreur
const [emailErrorMessage, setEmailErrorMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setNom(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleSpecialtyChange = (e) => {
    setSpecialite(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAdresse(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setNumero_tel(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Validation de l'e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailErrorMessage('Veuillez entrer une adresse e-mail valide.');
        return;
      }
 
      // Si l'e-mail est valide, réinitialiser l'erreur d'e-mail
      setEmailErrorMessage('');
      if (isSignUp) {
        // Logic for signing up
        const response = await axios.post(SIGNUPM_URL, {
          email,
          password,
          nom,
          prenom,
          specialite,
          adresse,
          numero_tel,
        });
        console.log(response.data);
        if(response.data){
          dispatch({type: "login", payload: response.data});
          localStorage.setItem("medecin", JSON.stringify(response.data));
        }
      } else {
        // Logic for logging in
        const response = await axios.post(LOGINM_URL, {
          email,
          password,
        });
        if(response.data){
          dispatch({type: "login", payload: response.data});
          localStorage.setItem("medecin", JSON.stringify(response.data));
        }
      }
   // Navigate to another page after login/signup
  } catch (error) {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      console.error('Error while submitting the form:', error);
    }
  }
  };

  return (
    <div className={`professional-page ${largeFont ? 'large-font' : ''}`}>
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
        style: { paddingLeft: '8px' } // Ajoute une marge intérieure de 8 pixels à gauche du texte
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
        style: { paddingLeft: '8px' } // Ajoute une marge intérieure de 8 pixels à gauche du texte
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
        style: { paddingLeft: '8px' } // Ajoute une marge intérieure de 8 pixels à gauche du texte
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
            style: { paddingLeft: '8px' } // Ajoute une marge intérieure de 8 pixels à gauche du texte
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
        style: { paddingLeft: '8px' }, // Ajoute une marge intérieure de 8 pixels à gauche du texte
        endAdornment: (
            <InputAdornment position="end" >
                <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: 0, bottom:0, top:0}}
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        ),
    }}
          />
          {isSignUp && (
            <TextField
             type={showPassword ? "text" : "password"}
              label="Confirmer le mot de passe"
              variant="outlined"
              fullWidth
              required
              InputProps={{
            style: { paddingLeft: '8px' } // Ajoute une marge intérieure de 8 pixels à gauche du texte
            }}
              
            />
          )}
          <Button className='login-bouton' type="submit" variant="contained" color="primary">
            {isSignUp ? 'S\'inscrire' : 'Se connecter'}
          </Button>
        </form>
        <Button  onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas encore de compte ? S\'inscrire'}
        </Button>
        {errorMessage && (<p className="error-message">{errorMessage}</p> )}
       
      </div>
    </div>
  );
};

export default AuthenticateMedecin;
