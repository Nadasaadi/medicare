import { useState } from 'react'
import { BrowserRouter,createRoutesFromElements,Route, RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

// layout
import RootLayout from './layouts/RootLayout';
import PatientLayout from './layouts/PatientLayout.jsx';
import MedecinLayout from './layouts/MedecinLayout.jsx';
// page
import Home from './pages/Home';
import AdminPage from './pages/AdminPage.jsx';
import Profil from './pages/patient/Profil.jsx';
import AuthenticatePatient from './pages/patient/AuthenticatePatient.jsx';
import Vaccin from './pages/patient/Vaccin.jsx';
import Allergie from './pages/patient/Allergie.jsx'



import AuthenticateMedecin from './pages/medecin/AuthenticateMedecin.jsx';
import MedecinProfil from './pages/medecin/MedecinProfil.jsx';
import Contact from './pages/Contact';
import Imagerie from './pages/patient/Imagerie.jsx';



// hook
import { useAuthContext } from "./hooks/useAuthContext";
import { useAuthContextMED } from './hooks/useAuthContextMed.jsx';

// context
import { analyseLoader } from './loaders/analyseLoader.js';
import Analyse from './pages/patient/Analyse.jsx';
import { vaccinLoader } from './loaders/vaccinLoader.js';
import { allergieLoader } from './loaders/allergieLoader.js';
import { maladieLoader } from './loaders/maladieLoader.js';
import MaladieCH from './pages/patient/MaladieCH.jsx';
import Consultation from './pages/patient/Consultation.jsx';
import { consultationLoader } from './loaders/consultationLoader.js';



// import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  // const queryClient = new QueryClient();
  const {user} = useAuthContext();
  const {medecin}= useAuthContextMED();
  // console.log("user rfrom app.js", user)
  const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
          <Route index element = {<Home/>} />
          <Route path="/AdminPage" element={<AdminPage/>} />
          <Route path='authenticate-patient' element={!user ? <AuthenticatePatient/> : <Navigate to={"/espace-patient"}/>}/>
          <Route path='espace-patient' element={ user ?  <PatientLayout/> : <Navigate to={"/authenticate-patient"}/>} >
            <Route path='profil'  element={ <Profil/> }/>
            <Route path='vaccin/:id_patient'  loader={vaccinLoader} element={<Vaccin/>}/>
            <Route path='analyse/:id_patient'  loader={analyseLoader} element={<Analyse/>}/>
            <Route path='allergie/:id_patient'  loader={allergieLoader} element={<Allergie/>}/>
            <Route path='maladie/:id_patient'  loader={maladieLoader} element={<MaladieCH/>}/>
            <Route path='imagerie/:id_patient' element={<Imagerie/>}/>
            <Route path='consultation/:id_patient' loader={consultationLoader} element={<Consultation/>}/>

            {/* <Route  path='analyse/sanguine/:id_patient' loader={analyseSanguineLoader} element={<AnalyseSanguine/>}/>
            <Route  path='analyse/urinaire' element={<AnalyseUrinaire/>}/>
            <Route  path='analyse/microbiologique' element={<AnalyseMicrobiologique/>}/>*/}
            </Route>
          
          <Route path="authenticate-medecin" element={!medecin ? <AuthenticateMedecin/> : <Navigate to={"/MedecinProfil"}/>}/>
          <Route path='MedecinProfil'  element={ medecin  ?  <MedecinLayout/> : <Navigate to={"/authenticate-medecin"}/>}>
          <Route path='/MedecinProfil' element={ <MedecinProfil/> }/>
          </Route>
          
          
          <Route path="/contact" element={<Contact/>} />
        </Route>
    )
  )
    return (
  
      <div>
        <RouterProvider router={router}/>
      </div>
  
  
  )
}


export default App

