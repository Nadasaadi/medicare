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
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
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
    date_consultation DATE NOT NULL,
    conclusion TEXT,
    id_medecin INT NOT NULL,
    id_patient INT NOT NULL,
    FOREIGN KEY (id_patient) REFERENCES patient(id_patient),
    FOREIGN KEY (id_medecin) REFERENCES medecin(id_medecin)
);

--table analyse 
CREATE TABLE analyse (
    id_analyse INT AUTO_INCREMENT PRIMARY KEY,
    type_analyse ENUM('Sanguine','Urinaire','Microbiologique'),
    date_analyse DATE,
    id_patient INT,
    id_nom_analyse INT,
    marquer VARCHAR(200),
    resultat DECIMAL(12,2),
    unite VARCHAR(50),
    norme DECIMAL(12,2),
    autres_informations TEXT NULL,
    FOREIGN KEY (id_patient) REFERENCES patient(id_patient)
    FOREIGN KEY (id_nom_analyse) REFERENCES nom_analyse(id_nom_analyse)
);


--table nom analyse
CREATE TABLE nom_analyse (
    id_nom_analyse INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) UNIQUE
);


--table vaccin 
CREATE TABLE Vaccin (
    id_vaccin INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    nom_vaccin VARCHAR(100),
    date_administration DATE,
    remarques TEXT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);



--table imagerie médicale 

CREATE TABLE ImagerieMedicale (
    id_image INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) ,
    description TEXT NULL,
    date_prise DATE,
    patient_id INT,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);

--table allergie 

CREATE TABLE Allergie (
    id_allergie INT AUTO_INCREMENT PRIMARY KEY,
    nom_allergie VARCHAR(100),
    description TEXT NULL,
    patient_id INT,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);



--table maladie chronique 

CREATE TABLE MaladieChronique (
    id_maladie INT AUTO_INCREMENT PRIMARY KEY,
    nom_maladie VARCHAR(100),
    description TEXT NULL,
    patient_id INT,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);



---table message contact 

CREATE TABLE MessagesContact (
    id_message INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255),
    Message TEXT,
    DateEnvoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Un champ pour enregistrer la date et l'heure à laquelle le message a été envoyé
    id_admin INT,
    FOREIGN KEY (id_admin) REFERENCES Admin(id_admin)
);


--table de politique de confidentialité 

CREATE TABLE Politique_de_confidentialité(
  id_politique INT AUTO_INCREMENT PRIMARY KEY,
  texte TEXT,
  id_admin INT,
  FOREIGN KEY (id_admin) REFERENCES Admin(id_admin)
);

--table termes et conditions
 CREATE TABLE term_condition(
  id INT AUTO_INCREMENT PRIMARY KEY,
  texte TEXT,
  id_admin INT,
  FOREIGN KEY (id_admin) REFERENCES Admin(id_admin)
);