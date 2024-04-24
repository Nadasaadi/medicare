
import React, { createContext, useEffect, useReducer, useState } from 'react';

export const AuthContextMed = createContext();
export const authReducerMed = (state, action) => {
  switch (action.type) {
    case "login": 
      return {medecin: action.payload};
    case "logout": 
      return {medecin: null};
    default: 
      return state;
  }
}
export const AuthProviderMed = ({ children }) => {
  const [state, dispatch] = useReducer(authReducerMed, {medecin: null} );
  useEffect(()=>{
    const medecin = JSON.parse(localStorage.getItem('medecin'));
    if(medecin) {
      dispatch({type: "login", payload: medecin});
    }

  }, []);
  const logout = () => {
    // Supprimer l'utilisateur du local storage
    localStorage.removeItem('medecin');
    // Dispatch de l'action logout
    dispatch({ type: "logout" });
  };
  return (
    <AuthContextMed.Provider value={{...state, dispatch, logout}}>
      {children}
    </AuthContextMed.Provider>
  )
};


