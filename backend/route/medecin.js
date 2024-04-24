const express  = require("express");

const router = express.Router();
 
const {signupM, loginM} = require("../controllers/medecin")


router.post("/signupM", signupM);

router.post("/loginM", loginM);




module.exports = router;