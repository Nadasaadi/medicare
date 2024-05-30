const express = require("express");
const router = express.Router();
const { signupM, loginM, updateMedecin ,getMedecin} = require("../controllers/medecin");

router.post("/signupM", signupM);
router.post("/loginM", loginM);
router.put("/updateMedecin", updateMedecin);
router.get('/getmed', getMedecin);


module.exports = router;