// LoginForm.js
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const LoginForm = ({ onLogin }) => {
  const [step, setStep] = useState(0); // L'étape initiale est 0
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNextStep = () => {
    setStep(step + 1); // Passer à l'étape suivante
  };

  const handleLogin = () => {
    // Gérer la connexion ici ou passer les données à une fonction parente
    onLogin({ email, password });
  };

  return (
    <div className="login-container">
      {step >= 1 && (
        <TextField
        size="15px"
          className="inputhome"
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          InputProps={{ 
            style: { color: "white" },
            inputProps: { style: { borderWidth: "1px", borderColor: "white", fontSize: "10px" ,height:"7px"} } // Ajuster la taille de la bordure
          }}
          InputLabelProps={{ style: { color: "white", textAlign: "center"} }} // Changer la couleur du label
          
          onChange={handleEmailChange}
        />
      )}
      {/* Ajouter un espace entre les champs email et mot de passe */}
      <div style={{ margin: "5px" }} />

      {step >= 2 && (
        <TextField
          className="inputhome"
          id="password"
          label="Password"
          type="password"
          InputProps={{ 
            style: { color: "white" },
            inputProps: { style: { borderWidth: "1px", fontSize: "10px" ,height:"7px"} } // Ajuster la taille de la bordure
          }}
          InputLabelProps={{ style: { color: "white" } }} // Changer la couleur du label
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
      )}
      {step === 0 && ( // Afficher le bouton "Login" seulement si step === 0
        <Button className="boutonhomeform"  color="primary" onClick={handleNextStep}>
          Admin
        </Button>
      )}
      {step === 1 && ( // Afficher le bouton "Next" seulement si step === 1
        <Button className="boutonhomeform" color="primary" onClick={handleNextStep}>
          Next
        </Button>
      )}
      {step === 2 && ( // Afficher le bouton "Login" seulement si step === 2
        <Button className="boutonhomeform"  color="primary" onClick={handleLogin}>
         Login
        </Button>
      )}
    </div>
  );
};

export default LoginForm;
