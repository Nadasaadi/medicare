import React from 'react';
import BannerImage from "../assets/doctor-nurses-special-equipment-removebg-preview.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import AdminForm from './Adminform';
const Home = () => {
  return (
    <>
    <div className="home-container">
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
          <button className="button-link" >
          <Link  className="secondary-button" to="/savoir_plus">Savoir plus <FiArrowRight /></Link>
          </button>

        

          
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;