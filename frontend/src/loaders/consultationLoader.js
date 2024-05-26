import axios from "axios";

const CONSULTATION_URL = 'http://localhost:9000/consultation/';
export const consultationLoader = async ({params}) => {
    const {id_patient} = params;
    const consultation  = await axios.get(CONSULTATION_URL, {
        params: {id_patient}
    });
    return consultation;
}

