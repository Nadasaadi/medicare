import { useContext } from "react";
import { AuthContextMed } from "../context/AuthContextMed";

export const useAuthContext = () =>{
    const context = useContext(AuthContextMed);
    if(!context) {
        throw Error ("Auth context must be use inside AuthCOntextProvider");
    }
    return context;
}