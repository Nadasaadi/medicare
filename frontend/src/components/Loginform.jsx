// LoginForm.js
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LOGIN = "http://localhost:9000/admin/loginAdmin";

const LoginForm = ({ onLogin }) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN, { email, password });
      if (response.data) {
        navigate("/AdminPage");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("Données invalide"); // Définir le message d'erreur
    }
  };

  return (
    <div className="login-container">
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {errorMessage}
        </div>
      )}
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
            inputProps: {
              style: {
                borderWidth: "1px",
                borderColor: "white",
                fontSize: "10px",
                height: "7px",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "white", textAlign: "center" },
          }}
          onChange={handleEmailChange}
        />
      )}
      <div style={{ margin: "5px" }} />
      {step >= 2 && (
        <TextField
          className="inputhome"
          id="password"
          label="Password"
          type="password"
          InputProps={{
            style: { color: "white" },
            inputProps: {
              style: { borderWidth: "1px", fontSize: "10px", height: "7px" },
            },
          }}
          InputLabelProps={{ style: { color: "white" } }}
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
      )}
      {step === 0 && (
        <Button className="boutonhomeform" color="primary" onClick={handleNextStep}>
          Admin
        </Button>
      )}
      {step === 1 && (
        <Button className="boutonhomeform" color="primary" onClick={handleNextStep}>
          Next
        </Button>
      )}
      {step === 2 && (
        <Button className="boutonhomeform" color="primary" onClick={handleLogin}>
          Login
        </Button>
      )}
    </div>
  );
};

export default LoginForm;