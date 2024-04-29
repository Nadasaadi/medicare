import React, {useEffect} from 'react'
import {Outlet, useNavigate, useLocation } from "react-router-dom";
import '../css/styleEP.css';
import {Box} from "@mui/material"
import { useAuthContext } from '../hooks/useAuthContext'
import Patientnav from '../components/patient/Patientnav'
const PatientLayout = () => {
  const {user} = useAuthContext()
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
      if (location.pathname == "/espace-patient"){
        navigate("profil");
      }
  },[]);
  return (
    
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
        <div>
          {
            user && (<Patientnav/>)
          }
        </div>
        <main>
          <Outlet/>
        </main>
    </Box>
  )
}

export default PatientLayout
