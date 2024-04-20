import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Styleprofissionel.css'; // Import du fichier CSS

const Professionel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Logique de connexion
  };

  const handleSignUp = () => {
    // Logique d'inscription
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (isSignUp) {
      // Logique de validation et envoi des données d'inscription
    } else {
      // Logique de validation et envoi des données de connexion
    }
  };

  return (
    <div className="professional-page">
      <div className="form-section">
      
        <h1>Bienvenue</h1>
        <form onSubmit={handleFormSubmit}>
          {isSignUp && (
            <>
              <TextField
                type="text"
                label="Nom"
                value={name}
                onChange={handleNameChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                type="text"
                label="Prénom"
                value={surname}
                onChange={handleSurnameChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                type="text"
                label="Spécialité"
                value={specialty}
                onChange={handleSpecialtyChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                type="text"
                label="Adresse"
                value={address}
                onChange={handleAddressChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                type="tel"
                label="Numéro de téléphone"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                variant="outlined"
                fullWidth
                required
              />
            </>
          )}
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            fullWidth
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
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />
          {isSignUp && (
            <TextField
              type="password"
              label="Confirmer le mot de passe"
              variant="outlined"
              fullWidth
              required
            />
          )}
          <Button className='login-bouton' type="submit" variant="contained" color="primary">
            {isSignUp ? 'S\'inscrire' : 'Se connecter'}
          </Button>
        </form>
        <Button className='signupboutton' onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas encore de compte ? S\'inscrire'}
        </Button>
      </div>
    </div>
  );
};

export default Professionel;
