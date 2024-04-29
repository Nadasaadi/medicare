import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Typography, Box } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

  




const AnalyseNav = () => {
    const {user} = useAuthContext();
    const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
        <List
            sx={{ 
                bgcolor: "inherit",
                py: 0,
            }}
            component="nav"
        >
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px"
            }}
            onClick={handleClick}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: "10px"
                }}
            >
                <ListItemIcon sx={{minWidth: "24px", color: "inherit"}}>
                    <AnalyticsIcon  />
                </ListItemIcon >
                <Typography>
                    Analyse
                </Typography>
            </Box>
            {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
        
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <Box
                    sx={{
                        px: "16px",
                        py: "10px",
                        ":hover":{
                            background: "#e0e0e0"
                        }
                    }}
                >
                    <NavLink to={`analyse/sanguine/:${user.id_patient}`}>
                        <Typography >
                            sanguine
                        </Typography>
                    </NavLink>
                </Box>
                <Box
                    sx={{
                        px: "16px",
                        py: "10px",
                        ":hover":{
                            background: "#e0e0e0"
                        }
                    }}
                >
                    <NavLink to={"analyse/urinaire"}>
                        <Typography>
                            urinaire
                        </Typography>
                    </NavLink>
                </Box>
                <Box
                    sx={{
                        px: "16px",
                        py: "10px",
                        ":hover":{
                            background: "#e0e0e0"
                        }
                    }}
                >
                    <NavLink to={"analyse/microbiologique"}>
                        <Typography>
                            microbiologique
                        </Typography>
                    </NavLink>
                </Box> 
            </List>
        </Collapse>
        </List>
    );
}

export default AnalyseNav
