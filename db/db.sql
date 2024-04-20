DROP database medicare;
create database medicare;
use medicare;
-- Création de la table patient
CREATE TABLE patient (
    id_patient INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(100),
    password VARCHAR(100),
    nom VARCHAR(50),
    prenom VARCHAR(50),
	date_naissance DATE,
    sexe ENUM('M', 'F'),
    lieu_naissance VARCHAR(100),
    id_dossier INT
);

-- Création de la table dossier
CREATE TABLE dossier (
    id_dossier INT PRIMARY KEY AUTO_INCREMENT,
    id_patient INT
);
-- Ajout de la contrainte de clé étrangère dans la table patient
ALTER TABLE patient
ADD CONSTRAINT fk_patient_dossier
FOREIGN KEY (id_dossier) REFERENCES dossier(id_dossier);

-- Ajout de la contrainte de clé étrangère dans la table dossier
ALTER TABLE dossier
ADD CONSTRAINT fk_dossier_patient
FOREIGN KEY (id_patient) REFERENCES patient(id_patient);


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
select * from patient;





