const express  = require("express");

const router = express.Router();
const {login} = require("../controllers/admin");

router.post('/loginAdmin', login);

module.exports = router;