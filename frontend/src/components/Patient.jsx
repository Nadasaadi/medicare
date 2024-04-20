import React, { useState } from 'react';
import imageform from "../assets/la-personne.png";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const SIGNUP_URL = 'http://localhost:9000/user/signup';
const LOGIN_URL = 'http://localhost:9000/user/login';

function Patient() {
  const { dispatch } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewMember, setIsNewMember] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date_naissance, setDate_naissance] = useState('');
  const [sexe, setSexe] = useState('M');
  const [lieu_naissance, setLieu_naissance] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Veuillez entrer une adresse e-mail valide.');
        return;
      }

      setEmailError('');
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
      if (error.response && error.response.status === 409) {
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
          <img src={imageform} alt="Image santé" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-patient">
            <label><span className="required">*</span>Email:</label>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="XXXX@gmail.com"
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
            {errorMessage && (<p className="error-message">{errorMessage}</p>)}
          </div>
          <div className="form-group-patient">
            <label><span className="required">*</span>Password:</label>
            <TextField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
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
          </div>
          {isNewMember && (
            <>
              <div className="form-group-patient">
                <label><span className="required">*</span>Nom:</label>
                <TextField
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group-patient">
                <label><span className="required">*</span>Prénom:</label>
                <TextField
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group-patient">
                <label><span className="required">*</span>Date naissance:</label>
                <TextField
                  type="date"
                  value={date_naissance}
                  onChange={(e) => setDate_naissance(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group-patient">
                <label><span className="required">*</span>Sexe:</label>
                <TextField
                  select
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="M">Homme</option>
                  <option value="F">Femme</option>
                </TextField>
              </div>
              <div className="form-group-patient">
                <label><span className="required">*</span>Lieu naissance:</label>
                <TextField
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
