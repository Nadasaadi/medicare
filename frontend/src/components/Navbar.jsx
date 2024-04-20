// Navbar.js
import React, { useState } from "react";
import Logo from "../assets/logo2.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material/";
import { FaHospitalUser } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import LoginForm from "./Loginform"
import './navbarstyle.css'; // Import du fichier CSS

const Navbar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogin = ({ email, password }) => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Gérer la connexion ou rediriger l'utilisateur après connexion
  };

  const menuOptions = [
    {
      text: "Accueil",
      icon: <IoHome />,
      link: "/"
    },
    {
      text: "Espace Patient",
      icon: <FaHospitalUser />,
      link: "/Patient"
    },
    {
      text: "Espace Professionnel",
      icon: <FaUserMd />,
      link: "/EspacePro"
    },
    {
      text: "Contact",
      icon: <MdOutlineAlternateEmail />,
      link: "/Contact"
    },
  ];

  return (
    <>
      <header className="navigation">
        <img className="nav-logo-container" src={Logo} alt="" />
        <nav className="navbar-links-container">
          {menuOptions.map((item, index) => (
            <NavLink key={index} to={item.link} activeClassName="activeLink">
              <span>{item.text}</span>
            </NavLink>
          ))}
        </nav>
        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <NavLink to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
        {(location.pathname === "/" || location.pathname === "/Contact") && (
          <LoginForm onLogin={handleLogin} />
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Navbar;
