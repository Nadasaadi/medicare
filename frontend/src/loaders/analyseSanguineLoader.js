import axios from "axios";

const ANALYSE_URL='http://localhost:9000/analyse/sanguineAnalyse';
export const analyseSanguineLoader = async ({params}) => {
    const {id_patient} = params;
  
    const sanguineAnalyse  = await axios.get(ANALYSE_URL, {
        params: {id_patient}
    });
    return sanguineAnalyse;
}

