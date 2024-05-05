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
import AnalyseSanguine from './pages/patient/analyse/AnalyseSanguine.jsx';
// import Analyse from './pages/patient/analyse/Analyse.jsx';
import AnalyseUrinaire from './pages/patient/analyse/AnalyseUrinaire.jsx';
import AnalyseMicrobiologique from './pages/patient/analyse/AnalyseMicrobiologique.jsx';
import AuthenticateMedecin from './pages/medecin/AuthenticateMedecin.jsx';
import MedecinProfil from './pages/medecin/MedecinProfil.jsx';
import Savoir_plus from './pages/Savoir_plus'
import Contact from './pages/Contact';




// hook
import { useAuthContext } from "./hooks/useAuthContext";

// context
import { FontSizeProvider } from './context/FontSizeContext'; 
import { analyseSanguineLoader } from './loaders/analyseSanguineLoader.js';


// import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  // const queryClient = new QueryClient();
  const {user} = useAuthContext();
  // console.log("user rfrom app.js", user)
  const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
          <Route index element = {<Home/>} />
          <Route path="/AdminPage" element={<AdminPage/>} />
            <Route path='authenticate-patient' element={!user ? <AuthenticatePatient/> : <Navigate to={"/espace-patient"}/>}/>
            <Route path="authenticate-medecin" element={!user ? <AuthenticateMedecin/> : <Navigate to={"/MedecinProfil"}/>}/>
          <Route path='espace-patient' element={ user ?  <PatientLayout/> : <Navigate to={"/authenticate-patient"}/>} >
            <Route path='profil' element={ <Profil/> }/>
            {/* <Route path='analyse' element={<AnalyseLayout/>}>
            </Route> */}
            <Route  path='analyse/sanguine/:id_patient' loader={analyseSanguineLoader} element={<AnalyseSanguine/>}/>
            <Route  path='analyse/urinaire' element={<AnalyseUrinaire/>}/>
            <Route  path='analyse/microbiologique' element={<AnalyseMicrobiologique/>}/>
          </Route>
          <Route path='MedecinProfil'  element={ user  ?  <MedecinLayout/> : <Navigate to={"/authenticate-medecin"}/>}>
          <Route path='profil' element={ <MedecinProfil/> }/>
          </Route>
          
          <Route path="/savoir_plus" element={<Savoir_plus/>} />
          <Route path="/contact" element={<Contact/>} />
        </Route>
    )
  )
    return (
      // <QueryClientProvider client={queryClient}> 
      <FontSizeProvider>
      <div>
        <RouterProvider router={router}/>
      </div>
   </FontSizeProvider>
  //  </QueryClientProvider>
  
  )
}


export default App

