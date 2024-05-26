const express = require("express");
const router = express.Router();
const { signupM, loginM, updateMedecin } = require("../controllers/medecin");

router.post("/signupM", signupM);
router.post("/loginM", loginM);
router.put("/updateMedecin", updateMedecin);

module.exports = router;