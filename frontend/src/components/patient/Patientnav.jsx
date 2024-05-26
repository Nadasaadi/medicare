// Patientnav.js
import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ImageIcon from '@mui/icons-material/Image';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { HiOutlineBars3 } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
const Patientnav = ({ onNavigationChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = React.useContext(AuthContext);
  const   {user} = useAuthContext()
  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
          
          <Divider />
          <li className="patient-nav-item">
  <NavLink className="patient-nav-link" to={`consultation/${user.id_patient}`}>
  <MedicalServicesIcon />
 Consultations
  </NavLink>
</li>
<Divider />
          <li className="patient-nav-item">
            <NavLink to={`analyse/:${user.id_patient}`} className="patient-nav-link" >
              <AnalyticsIcon/> Analyse
            </NavLink>
          </li>
          <Divider />
          <li className="patient-nav-item">
            <NavLink className="patient-nav-link" to={`vaccin/:${user.id_patient}`}>
              <VaccinesIcon /> Vaccins
            </NavLink>
          </li>
          <Divider />
          <li className="patient-nav-item">
            <NavLink className="patient-nav-link"  to={`allergie/:${user.id_patient}`}>
              <HealthAndSafetyIcon /> Allergie
            </NavLink>
          </li>
          <Divider />
          <li className="patient-nav-item">
            <NavLink className="patient-nav-link" to={`maladie/:${user.id_patient}`}>
              <MedicalInformationIcon /> Maladie chronique
            </NavLink>
          </li>
          <Divider />
          <li className="patient-nav-item">
  <NavLink className="patient-nav-link" to={`imagerie/${user.id_patient}`}>
    <ImageIcon /> Imagerie médicale
  </NavLink>
</li>
          <Divider />

          <li className="patient-nav-item">
            <button onClick={logout} color='primary' className="logout-button1">
              Déconnexion <LogoutIcon />
            </button>
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