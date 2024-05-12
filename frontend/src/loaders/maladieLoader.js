import axios from "axios";

const MALADIE_URL = 'http://localhost:9000/maladie/';
export const maladieLoader = async ({params}) => {
    const {id_patient} = params;
    const maladie  = await axios.get(MALADIE_URL, {
        params: {id_patient}
    });
    return maladie;
}

