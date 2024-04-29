import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ImageIcon from '@mui/icons-material/Image';
import { HiOutlineBars3 } from "react-icons/hi2";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AnalyseNav from '../analyse/AnalyseNav';
import { Divider } from '@mui/material';

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
            <NavLink className="patient-nav-link" to={'profil'}>
              <AccountCircleIcon /> Profil
            </NavLink>
          </li>
          <Divider/>
          <li className="patient-nav-item">
            {/* <NavLink className="patient-nav-link" to={'analyse'}>
              <AnalyticsIcon /> Analyses
            </NavLink> */}
            <AnalyseNav/>
          </li>
          <Divider/>
          <li className="patient-nav-item">
            <NavLink className="patient-nav-link" href="#vaccin" onClick={() => handleNavigation('vaccin')}>
              <VaccinesIcon /> Vaccins
            </NavLink>
          </li>
          <li className="patient-nav-item">
            <NavLink className="patient-nav-link" href="#allergie" onClick={() => handleNavigation('allergie')}>
              <HealthAndSafetyIcon /> Allergie
            </NavLink>
          </li>
          <li className="patient-nav-item">
            <NavLink className="patient-nav-link" href="#maladie-chronique" onClick={() => handleNavigation('maladie-chronique')}>
              <MedicalInformationIcon /> Maladie chronique
            </NavLink>
          </li>
          <li className="patient-nav-item">
            <NavLink className="patient-nav-link" href="#imagerie-medicale" onClick={() => handleNavigation('imagerie-medicale')}>
              <ImageIcon /> Imagerie médicale
            </NavLink>
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
