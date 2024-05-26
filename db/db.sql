--base de données--
create database medicare;
use medicare;

--table patient

CREATE TABLE patient (
    id_patient INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    nom VARCHAR(50),
    prenom VARCHAR(50),
    date_naissance DATE,
    sexe ENUM('M', 'F'),
    lieu_naissance VARCHAR(100)
);
 
--table admin 

CREATE TABLE Admin (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255)
);

--table medecin 

CREATE TABLE medecin (
    id_medecin INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    specialite VARCHAR(100),
    adresse VARCHAR(255),
    numero_tel VARCHAR(15)
);


--les tables qui va stocker le dossier  
--table consultation 
CREATE TABLE consultation (
    id_consultation INT AUTO_INCREMENT PRIMARY KEY,
    id_medecin INT NOT NULL,
    id_patient INT NOT NULL,
    date_consultation DATE NOT NULL,
    conclusion TEXT,
    FOREIGN KEY (id_patient) REFERENCES patient(id_patient),
    FOREIGN KEY (id_medecin) REFERENCES medecin(id_medecin)
);

--table analyse 
CREATE TABLE analyse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_analyse VARCHAR(255),
    date_analyse DATE,
    id_patient INT,
    id_nom_analyse INT,
    marquer VARCHAR(200),
    resultat DECIMAL(12,2),
    unite VARCHAR(50),
    norme DECIMAL(12,2),
    autres_informations TEXT NULL,
    FOREIGN KEY (id_patient) REFERENCES patient(id_patient)
    FOREIGN KEY (id_type_analyse) REFERENCES types_analyse(id)
);


--table type analyse
CREATE TABLE nom_analyse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) UNIQUE
);


--table vaccin 
CREATE TABLE Vaccin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    nom_vaccin VARCHAR(100),
    date_administration DATE,
    remarques TEXT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);



--table image 

CREATE TABLE ImagerieMedicale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    image MEDIUMBLOB,
    description TEXT NULL,
    date_prise DATE,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);

--table allergie 

CREATE TABLE Allergie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    nom_allergie VARCHAR(100),
    description TEXT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);



--table maladie chronique 

CREATE TABLE MaladieChronique (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    nom_maladie VARCHAR(100),
    description TEXT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);



---table message contact 

CREATE TABLE MessagesContact (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255),
    Message TEXT,
    DateEnvoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP-- Un champ pour enregistrer la date et l'heure à laquelle le message a été envoyé
);


--table de politique de confidentialité 

CREATE TABLE Politique_de_confidentialité(
  id INT AUTO_INCREMENT PRIMARY KEY,
  texte TEXT
);

--table termes et conditions
 CREATE TABLE term_condition(
  id INT AUTO_INCREMENT PRIMARY KEY,
  texte TEXT
);