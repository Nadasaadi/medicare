const express = require('express');//importe express
const bodyParser = require('body-parser');
const app = express();//creer une instance de l'application express
const PORT = 9000;
const cors = require('cors');
const path = require('path'); // Importer le module path

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
// Middleware CORS pour permettre les requêtes cross-origin
app.use(cors());


// Importation des routes des images
const imagerieRoutes = require('./route/imagerie');
app.use('/imagerie', imagerieRoutes);

//Cela permettra à Express de servir les fichiers statiques à partir du dossier public.
app.use(express.static(path.join(__dirname, 'public')));

// routes 

const  user = require("./route/user");
const analyse= require("./route/analyse");
const contactRoutes = require('./route/contactRoutes');
const admin= require("./route/admin");
const message=require("./route/message");
const medecin=require("./route/medecin")
const privacyPolicy=require("./route/PrivacyPolicy");
const termCondition=require("./route/TermCondition");
const vaccin = require('./route/vaccin');
const allergie =require ('./route/allergie');
const maladie =require ('./route/maladie');
const consultation =require('./route/consultation');

app.use("/user", user);// Importe le module de route pour les utilisateurs à partir du fichier user.js situé dans le répertoire route. Ces modules de route contiennent la logique pour gérer les différentes requêtes HTTP liées aux utilisateurs.
app.use("/analyse", analyse);
app.use("/contact", contactRoutes);
app.use("/admin", admin);
app.use("/message",message);
app.use("/medecin",medecin);
app.use("/privacyPolicy",privacyPolicy);
app.use("/termCondition",termCondition);
app.use("/vaccin", vaccin);
app.use("/allergie", allergie);
app.use("/maladie", maladie);
app.use("/consultation",consultation)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });