import axios from "axios";

//obtenemos el token que se guarda en el sessionstorage
const token = sessionStorage.getItem('token_bookings')

 const getAccomodations = async (token) => {
    try{

        const response = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations", {
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los alojamientos", error);
    }
}
 const newAccomodation = async (data) => {
    try{

        const response = await axios.post("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation",data, {
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los alojamientos", error);
    }
}

const updateAccomodation = async (id, data) => {
    try {
        const response = await axios.put(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id}`, data, {
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la reserva", error);
    }
}

export { getAccomodations,newAccomodation,updateAccomodation };