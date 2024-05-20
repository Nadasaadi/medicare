const express  = require("express");

const router = express.Router();
 
const {signup, login, findPatientByEmail} = require("../controllers/user")


router.post("/signup", signup);

router.post("/login", login);

router.get("/user/:email", findPatientByEmail);




module.exports = router;