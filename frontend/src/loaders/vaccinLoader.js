import axios from "axios";

const VACCIN_URL = 'http://localhost:9000/vaccin/';
export const vaccinLoader = async ({params}) => {
    const {id_patient} = params;
    const vaccin  = await axios.get(VACCIN_URL, {
        params: {id_patient}
    });
    return vaccin;
}

