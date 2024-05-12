const express  = require("express");

const router = express.Router();
 
const {signupM,  loginM , updateMedecin} = require("../controllers/medecin")


router.post("/signupM", signupM);

router.post("/loginM",  loginM );
router.put("/medecin/:id", updateMedecin); // route pour la mise à jour



module.exports = router;