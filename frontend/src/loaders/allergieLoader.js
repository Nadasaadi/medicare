import axios from "axios";

const ALLERGIE_URL = 'http://localhost:9000/allergie/';
export const allergieLoader = async ({params}) => {
    const {id_patient} = params;
    const allergie  = await axios.get(ALLERGIE_URL, {
        params: {id_patient}
    });
    return allergie;
}

