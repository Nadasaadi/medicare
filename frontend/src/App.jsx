import { useState } from 'react'
import Patient from './components/Patient'
import { BrowserRouter,createRoutesFromElements,Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Espacepatient from './components/Espacepatient';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Savoir_plus from './components/Savoir_plus'
import { useAuthContext } from "./hooks/useAuthContext";
import Professionel from './components/Professionel';
import { FontSizeProvider } from './context/FontSizeContext'; 
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  const {user} = useAuthContext();
  console.log("user rfrom app.js", user)
  const router=createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>
       <Route index element = {<Home/>} />
       <Route path ="/Patient"  element = {user ? <Espacepatient patient={user}/> : <Patient/> } />
       <Route path="/savoir_plus" element={<Savoir_plus/>} />
       <Route path="/Contact" element={<Contact/>} />
       <Route path="/EspacePro" element={<Professionel/>} />
       </Route>
    )
  )
  return (
    
    <QueryClientProvider client={queryClient}> 
    <FontSizeProvider>
   <div>
   
    <RouterProvider router={router}/>
   
   
   </div>
   </FontSizeProvider>
   </QueryClientProvider>
    
  )
}


export default App
