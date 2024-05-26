import React from 'react';
import BannerImage from "../assets/doctor-nurses-special-equipment-removebg-preview.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer"
import Service from "../components/Service"
import { useFontSize } from '../context/FontSizeContext'; // importer le hook du contexte de la taille de la police
const Home = () => {
  
  const { largeFont } = useFontSize(); // Utilisez le hook pour lire l'état de l'agrandissement du texte
  return (
    <>
     <div className={`home-container ${largeFont ? 'large-font' : ''}`}> {/* Utilisez une classe conditionnelle pour agrandir le texte */}
      <div className="home-banner-container">
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
          
        <div className="home-text-section">
          <h2 className="primary-heading">
            optimiser la gestion de vos dossier médicaux!
          </h2>
          <p className="primary-text">
          Optimisez votre pratique médicale avec notre solution de gestion de dossiers médicaux. Accès rapide, organisation efficace et sécurité garantie pour des soins de qualité
          </p>
         {/* <button className="button-link" >
          <Link  className="secondary-button" to="/savoir_plus">Savoir plus <FiArrowRight /></Link>
          </button>*/}

        
          
        </div>
      </div>
    </div>
  <Service/>
          
          <Footer/>
        
    </>
  )
}

export default Home;