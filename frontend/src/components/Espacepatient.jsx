import React, { useState } from 'react';
import './styleEP.css';
import { AuthContext } from '../context/AuthContext';
import Analyse from './Analyse';
import Vaccin from './Vaccin';
import Profil from './Profil';
import Patientnav from './Patientnav';

const EspacePatient = ({ patient }) => {
  const { logout } = React.useContext(AuthContext);
  const [selectedSection, setSelectedSection] = useState('profil');

  const handleNavigationChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className='espace-patient-container'>
      <Patientnav onNavigationChange={handleNavigationChange} />
      <div className="main-content">
      <main>
        {selectedSection === 'profil' && <Profil patient={patient} />}
        {selectedSection === 'analyse' && <Analyse analyses={[]} />}
        {selectedSection === 'vaccin' && <Vaccin vaccins={[]} />}
      </main>
      </div>
    </div>
  );
};

export default EspacePatient;
