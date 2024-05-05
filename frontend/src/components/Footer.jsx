import React, { useState, useEffect } from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import "../css/FooterStyle.css";
import axios from 'axios';

const PRIVACY_POLICY_URL = 'http://localhost:9000/privacyPolicy';
const TERM_CONDITION_URL = 'http://localhost:9000/termCondition';

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [isLoading, setIsLoading] = useState(true);
const [isLoadingTerm, setIsLoadingTerm] = useState(true)
const [termCondition, setTermCondition] = useState([]);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(PRIVACY_POLICY_URL);
        setPrivacyPolicy(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la politique de confidentialité :', error);
      } finally {
        setIsLoading(false);
      }
    };

    const cancelTokenSource = axios.CancelToken.source();

    fetchPrivacyPolicy();

    return () => {
      cancelTokenSource.cancel('Composant démonté');
    };
  }, [showPrivacyModal]);


  //terme et condition
  useEffect(() => {
    const fetchTermCondition = async () => {
      try {
        setIsLoadingTerm(true);
        const response = await axios.get(TERM_CONDITION_URL);
        setTermCondition(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des termes et conditions :', error);
      } finally {
        setIsLoadingTerm(false);
      }
    };
  
    const cancelTokenSource = axios.CancelToken.source();
    fetchTermCondition();
  
    return () => {
      cancelTokenSource.cancel('Composant démonté');
    };
  }, [showTermsModal]);


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
        <h2>Termes et conditions</h2>
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
      </div>
      <div className="modal-body">
        {isLoadingTerm ? (
          <p>Chargement des termes et conditions...</p>
        ) : termCondition.length > 0 ? (
          termCondition.map((element, index) => <p key={index}>{element.texte}</p>)
        ) : (
          <p>Aucun terme et condition disponible.</p>
        )}
      </div>
      <div className="modal-footer">
        <button className="buttonaccept" onClick={handleCloseModal}>
          Accepter
        </button>
      </div>
    </div>
  </div>
)}
      {showPrivacyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Politique de confidentialité</h2>
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              {isLoading ? (
                <p>Chargement de la politique de confidentialité...</p>) : 
                privacyPolicy.map((element,index)=>(
                  <p>{element.texte}</p>
                ))}
            </div>
            <div className="modal-footer">
              <button className="buttonaccept" onClick={handleCloseModal}>
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;