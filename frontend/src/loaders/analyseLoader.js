import axios from "axios";

const ANALYSE_URL='http://localhost:9000/analyse/';
export const analyseLoader = async ({params}) => {
    const {id_patient} = params;
    const analyse  = await axios.get(ANALYSE_URL, {
        params: {id_patient}
    });
    return analyse;
}

