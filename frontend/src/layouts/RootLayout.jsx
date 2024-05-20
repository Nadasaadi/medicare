import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/AdminPage';

  return (
    <div>
      <div>{!isAdminPage && <Navbar />}</div>
      <main>
        <Outlet />
      </main>
      {/* <Footer/> */}
    </div>
  );
};

export default RootLayout;