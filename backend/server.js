const express = require('express');//importe express
const bodyParser = require('body-parser');


const app = express();//creer une instance de l'application express
const PORT = 9000;
const cors = require('cors');

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
// Middleware CORS pour permettre les requêtes cross-origin
app.use(cors());


// routes 
const  user = require("./route/user");
const analyse= require("./route/analyse");
const contactRoutes = require('./route/contactRoutes');
const admin= require("./route/admin");
const message=require("./route/message");
const medecin=require("./route/medecin")
const privacyPolicy=require("./route/PrivacyPolicy");
const termCondition=require("./route/TermCondition");
app.use("/user", user);// Importe le module de route pour les utilisateurs à partir du fichier user.js situé dans le répertoire route. Ces modules de route contiennent la logique pour gérer les différentes requêtes HTTP liées aux utilisateurs.
app.use("/analyse", analyse);
app.use("/contact", contactRoutes);
app.use("/admin", admin);
app.use("/message",message);
app.use("/medecin",medecin);
app.use("/privacyPolicy",privacyPolicy);
app.use("/termCondition",termCondition);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });