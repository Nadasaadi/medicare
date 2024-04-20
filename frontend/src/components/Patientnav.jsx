import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ImageIcon from '@mui/icons-material/Image';
import { HiOutlineBars3 } from "react-icons/hi2";
import { useState } from 'react';

const Patientnav = ({ onNavigationChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigation = (section) => {
    onNavigationChange(section);
  };

  return (
    <aside>
      <div className="patient-nav">
        <ul className={`patient-navbar-nav ${showMenu ? 'show-menu' : ''}`}>
          <li className="patient-nav-item">
            <a className="patient-nav-link" href="#profil" onClick={() => handleNavigation('profil')}>
              <AccountCircleIcon /> Profil
            </a>
          </li>
          <li className="patient-nav-item">
            <a className="patient-nav-link" href="#analyse" onClick={() => handleNavigation('analyse')}>
              <AnalyticsIcon /> Analyses
            </a>
          </li>
          <li className="patient-nav-item">
            <a className="patient-nav-link" href="#vaccin" onClick={() => handleNavigation('vaccin')}>
              <VaccinesIcon /> Vaccins
            </a>
          </li>
          <li className="patient-nav-item">
            <a className="patient-nav-link" href="#allergie" onClick={() => handleNavigation('allergie')}>
              <HealthAndSafetyIcon /> Allergie
            </a>
          </li>
          <li className="patient-nav-item">
            <a className="patient-nav-link" href="#maladie-chronique" onClick={() => handleNavigation('maladie-chronique')}>
              <MedicalInformationIcon /> Maladie chronique
            </a>
          </li>
          <li className="patient-nav-item">
            <a className="patient-nav-link" href="#imagerie-medicale" onClick={() => handleNavigation('imagerie-medicale')}>
              <ImageIcon /> Imagerie médicale
            </a>
          </li>
        </ul>
        <div className="menu-btn" onClick={toggleMenu}>
          <HiOutlineBars3 />
        </div>
      </div>
    </aside>
  );
};

export default Patientnav;
