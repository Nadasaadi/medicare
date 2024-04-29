import React from 'react'
import { AuthContext } from '../../context/AuthContext'; // Importez le contexte d'authentification
import LogoutIcon from '@mui/icons-material/Logout';
import { useFontSize } from '../../context/FontSizeContext';
import { useAuthContext } from '../../hooks/useAuthContext';
const Profil = () => {
  const {user } = useAuthContext()
  const { largeFont } = useFontSize(); 
    const { nom, prenom, sexe, date_naissance, lieu_naissance } = user;
    const { logout } = React.useContext(AuthContext);
    return (
      <div id='profil' className=  {`profil-container ${largeFont ? 'large-font' : ''}`}>
    
        <h2>Profil Utilisateur</h2>
        <p><span className="label">Nom:</span> {nom}</p>
        <p><span className="label">Prénom:</span> {prenom}</p>
        <p><span className="label">Sexe:</span> {sexe}</p>
        <p><span className="label">Date de Naissance:</span> {date_naissance}</p>
        <p><span className="label">Lieu de Naissance:</span> {lieu_naissance}</p>
        <div className='button-resp'>
        <button onClick={logout} className="logout-button"  >Déconnexion <LogoutIcon/></button>
        </div>
      </div>
    );
  };

export default Profil