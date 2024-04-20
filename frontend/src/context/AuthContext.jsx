// authContext.js
import { LayersClear } from '@mui/icons-material';
import React, { createContext, useEffect, useReducer, useState } from 'react';

export const AuthContext = createContext();
export const authReducer = (state, action) => {
  switch (action.type) {
    case "login": 
      return {user: action.payload};
    case "logout": 
      return {user: null};
    default: 
      return state;
  }
}
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {user: null} );
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      dispatch({type: "login", payload: user});
    }

  }, []);
  const logout = () => {
    // Supprimer l'utilisateur du local storage
    localStorage.removeItem('user');
    // Dispatch de l'action logout
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider value={{...state, dispatch, logout}}>
      {children}
    </AuthContext.Provider>
  )
};


