import React, { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import "./FooterStyle.css";

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleTermsClick = () => {
    setShowTermsModal(true);
  };

  const handlePrivacyClick = () => {
    setShowPrivacyModal(true);
  };

  const handleCloseModal = () => {
    setShowTermsModal(false);
    setShowPrivacyModal(false);
  };

  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
        <span>231-XXXX-XXXX</span>
          <span>medicare@gmail.com</span>
          <span onClick={handleTermsClick}>Termes et Conditions</span>
          <span onClick={handlePrivacyClick}>Politique de confidentialité </span>
        </div>
      </div>

      {showTermsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Termes et Conditions</h2>
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>
            Utilisation du Site : En utilisant ce site, vous acceptez nos termes et conditions.
           </p>
           <p>
            Confidentialité : Vos données sont sécurisées et ne seront pas partagées sans votre consentement.
           </p>
           <p>
            Responsabilité : Nous nous efforçons de fournir des informations précises, mais nous ne sommes pas responsables des erreurs.
           </p>
           <p>
            Modification : Nous nous réservons le droit de modifier ces termes à tout moment.
           </p>
           <p>
            Propriété Intellectuelle : Le contenu de ce site est protégé par des droits d'auteur.
           </p>
           <p>
            Contact : Pour toute question, contactez-nous via notre formulaire de contact.
            </p>
              {/* Ajoutez ici vos termes et conditions */}
            </div>
            <div className="modal-footer">
              <button className="buttonaccept" onClick={handleCloseModal}>Accept</button>
            </div>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Politique de confidentialité </h2>
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>
            -Nous collectons vos informations personnelles uniquement pour fournir nos services de gestion de dossiers médicaux et de profils de médecins.
            </p>
            <p>
            -Vos informations sont sécurisées et ne sont pas partagées sans votre consentement, sauf si requis par la loi.
            </p>
            <p>
            -En utilisant notre site, vous acceptez cette politique de confidentialité.
            </p>
            <p>
            -Pour toute question, contactez-nous via notre formulaire de contact.
            </p>
            </div>
            <div className="modal-footer">
              <button className="buttonaccept" onClick={handleCloseModal}>Accept</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
