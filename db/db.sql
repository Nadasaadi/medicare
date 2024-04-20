DROP database medicare;
create database medicare;
use medicare;
-- Création de la table patient
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
CREATE TABLE Admin (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255)
);


drop table patient;
drop tables AnalysesSanguines,analyse_urinaire,AnalyseMicrobiologique;
-- Création de la table medecin
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
-- les tables d analyse
CREATE TABLE AnalysesSanguines (
    ID_Analyse INT PRIMARY KEY AUTO_INCREMENT,
    ID_Patient INT,
    Date DATE,
    Type ENUM('Numération formule sanguine (NFS)',
              'Bilan lipidique',
              'Glycémie',
              'Dosage de marqueurs hépatiques (ALAT, ASAT, GGT, bilirubine, etc.)',
              'Dosage de marqueurs rénaux (urée, créatinine, etc.)',
              'Dosage de marqueurs inflammatoires (CRP, VS, etc.)',
              'Dosage de marqueurs hormonaux (thyroïde, etc.)'),
    MarqueurSanguin VARCHAR(100),  -- Ajout de l'attribut MarqueurSanguin pour indiquer si ALAt ou ASAt ou GGT...ect
    Resultat DECIMAL(12, 2),
    UniteMesure ENUM('x10^9/L', 'mg/dL', 'U/L', 'µIU/mL', 'mg/L'),
    AutresInformations TEXT,
    FOREIGN KEY (ID_Patient) REFERENCES patient(id_patient)
);

CREATE TABLE analyse_urinaire (
    id_analyse INT PRIMARY KEY AUTO_INCREMENT,
    id_patient INT,
    date_analyse DATE,
    type_analyse ENUM('Analyse Chimique', 'Examen Microscopique', 'Culture', 'test de Grossesse'),
    marqueurs VARCHAR(100),
    resultats TEXT,-- Si les résultats peuvent être des chaînes de caractères (par exemple, des valeurs textuelles comme "Présent", "Absent", "Normal", "Élevé", etc.),
    autres_informations TEXT,
    FOREIGN KEY (id_patient) REFERENCES patient(id_patient)
);


CREATE TABLE AnalyseMicrobiologique (
    ID INT PRIMARY KEY AUTO_INCREMENT,
id_patient INT,
    DateAnalyse DATE,
    TypeAnalyse ENUM('Culture bactérienne', 'Antibiogramme', 'Examen microscopique', 'PCR', 'Sérologie', 'Examen parasitologique des selles'),
    Marqueurs VARCHAR(100),
    Resultats TEXT,
    AutresInformations TEXT,
   FOREIGN KEY (ID_Patient) REFERENCES patient(id_patient)
);


CREATE TABLE Vaccin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    nom_vaccin VARCHAR(100),
    date_administration DATE,
    rappel_effectue BOOLEAN,
    remarques TEXT,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);
CREATE TABLE Allergie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    nom_allergie VARCHAR(100),
    description TEXT,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);
CREATE TABLE MaladieChronique (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    nom_maladie VARCHAR(100),
    description TEXT,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);
CREATE TABLE ImagerieMedicale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    image MEDIUMBLOB,
    description TEXT,
    date_prise DATE,
    FOREIGN KEY (patient_id) REFERENCES patient(id_patient)
);
-- creation de la table qui va stocké les messages envoyer pour contactez l admin du site
CREATE TABLE MessagesContact (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Patient INT,
    ID_Medecin INT,
    ID_Admin INT,
    Email VARCHAR(255),
    Message TEXT,
    DateEnvoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Un champ pour enregistrer la date et l'heure à laquelle le message a été envoyé
    FOREIGN KEY (ID_Patient) REFERENCES patient(id_patient),
    FOREIGN KEY (ID_Medecin) REFERENCES medecin(id_medecin),
    FOREIGN KEY (ID_Admin) REFERENCES Administrateurs(ID)
);


-- insertion dans table analyse sanguine



select * from patient;
select*from AnalysesSanguines;
SELECT * FROM AnalysesSanguines;


INSERT INTO AnalysesSanguines (ID_Patient, Date, Type, MarqueurSanguin, Resultat, UniteMesure, AutresInformations)
VALUES (1, '2024-04-16', 'Numération formule sanguine (NFS)', 'ALAT', 3.5, 'U/L', 'Résultat dans la plage normale.');

INSERT INTO medecin (nom, prenom, email, password, specialite, adresse, numero_tel)
VALUES ('saadi', 'nada', 'nada@gmail.com', 'nada', 'Cardiologie', '123 Rue de la Santé', '0123456789');





