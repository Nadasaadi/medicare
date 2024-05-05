const mysql =require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost', // L'adresse de votre base de données MySQL
    user: 'root', // Votre nom d'utilisateur MySQL
     password: 'nadasaadi2003*', // Votre mot de passe MySQL
    //password: 'rdb_best6then6Nordb', // Votre mot de passe MySQL
    database: 'medicare' // Le nom de votre base de données MySQL
});
const db = connection.promise();
module.exports = db;
