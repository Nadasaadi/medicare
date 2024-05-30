import React from 'react';
import BannerImage from "../assets/doctor-nurses-special-equipment-removebg-preview.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer"
import Service from "../components/Service"
const Home = () => {
  
  return (
    <>
     <div className='home-container'>
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

        </div>
      </div>
    </div>
  <Service/>
          
          <Footer/>
        
    </>
  )
}

export default Home;