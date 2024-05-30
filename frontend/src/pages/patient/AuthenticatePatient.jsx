import React, { useState } from 'react';
import imageform from "../../assets/la-personne.png";
import { TextField, Button, Select, MenuItem, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import '../../css/patientform.css';
import background from '../../assets/stethoscope-capsules-bottle-grey-background.jpg';
import Footer from '../../components/Footer';
import { useAuthContext } from "../../hooks/useAuthContext";

const SIGNUP_URL = 'http://localhost:9000/user/signup';
const LOGIN_URL = 'http://localhost:9000/user/login';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function AuthenticatePatient() {
 
  const { dispatch } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewMember, setIsNewMember] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date_naissance, setDate_naissance] = useState(null);
  const [sexe, setSexe] = useState('M');
  const [lieu_naissance, setLieu_naissance] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Veuillez entrer une adresse e-mail valide.');
        return;
      }

      setEmailError('');

      if (isNewMember && !passwordRegex.test(password)) {
        setPasswordError('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.');
        return;
      }

      setPasswordError('');

      if (isNewMember) {
        const response = await axios.post(SIGNUP_URL, {
          email,
          password,
          nom,
          prenom,
          date_naissance,
          sexe,
          lieu_naissance,
        });
        if (response.data) {
          dispatch({ type: "login", payload: response.data });
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } else {
        const response = await axios.post(LOGIN_URL, {
          email,
          password,
        });
        if (response.data) {
          dispatch({ type: "login", payload: response.data });
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Error while submitting the form:', error.response.data);
      }
    }
  };



  const getPasswordErrorMessage = () => {
    if (isNewMember) {
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
    <div>
      <div className='patient-page-container'>
        <div className="health-image">
          <img src={imageform} alt="Image santé" />
        </div>
        <h1>Bienvenue dans notre espace patient!</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-patient">
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="XXXX@gmail.com"
              fullWidth
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="form-group-patient">
            <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              fullWidth
              required
              InputProps={{
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
          </div>
          {isNewMember && passwordError && <p className="error-message">{passwordError}</p>}
          {isNewMember && (
            <>
              <div className="form-group-patient">
                <TextField
                  type="text"
                  label="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="form-control"
                  fullWidth
                  required
                />
       
              </div>
              <div className="form-group-patient">
                <TextField
                  type="text"
                  label="Prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="form-control"
                  fullWidth
                  required
                />
              </div>
              <div className="form-group-patient">
                <Select
                  label="Sexe"
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                  fullWidth
                  required
                >
                  <MenuItem value="M">Homme</MenuItem>
                  <MenuItem value="F">Femme</MenuItem>
                </Select>
              </div>
              <div className="form-group-patient">
                <TextField
                  type="date"
                  label="Date de naissance"
                  value={date_naissance}
                  onChange={(e) => setDate_naissance(e.target.value)}
                  className="form-control"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="form-group-patient">
                <TextField
                  type="text"
                  label="Lieu de naissance"
                  value={lieu_naissance}
                  onChange={(e) => setLieu_naissance(e.target.value)}
                  className="form-control"
                  fullWidth
                  required
                />
              </div>
            </>
          )}
          <Button className='login-bouton' type="submit" variant="contained" color="primary">
            {isNewMember ? 'S\'inscrire' : 'Se connecter'}
          </Button>
          <Button
            onClick={() => setIsNewMember(!isNewMember)}
            fullWidth
          >
            {isNewMember ? 'Utiliser un compte existant' : 'Créer un nouveau compte'}
          </Button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AuthenticatePatient;