import React, { useState } from 'react';
import imageform from "../assets/la-personne.png";
import { TextField, Button, Select, MenuItem,IconButton,InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFontSize } from '../context/FontSizeContext';
import axios from 'axios'; // Importez Axios
import './patientform.css'; // Import du fichier CSS
import Footer from './Footer';
import { useAuthContext } from "../hooks/useAuthContext";
const SIGNUP_URL = 'http://localhost:9000/user/signup';
const LOGIN_URL = 'http://localhost:9000/user/login';

function Patient() {
  const { largeFont } = useFontSize(); 
  // update user context 
  const {dispatch} = useAuthContext()
  // State variables to store input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewMember, setIsNewMember] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date_naissance, setDate_naissance] = useState(null);
  const [sexe, setSexe] = useState('M');
  const [lieu_naissance, setLieu_naissance] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Déclarez un état pour stocker le message d'erreur
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validation de l'e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
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
      setErrorMessage(error.response.data.message);
    } else {
      console.error('Error while submitting the form:', error.response.data);
    }
  }
  };

  return (
    <>
    
    <div className={`patient-page-container ${largeFont ? 'large-font' : ''}`}>
    <div className="health-image">
    <img src={imageform}  alt="Image santé"  />
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
        </div>
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
        {errorMessage && (<p className="error-message">{errorMessage}</p> )}
       
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default Patient;
