import axios from "axios";

//obtenemos el token que se guarda en el sessionstorage
const token = sessionStorage.getItem('token_bookings')

const getBookings = async (token) => {
    try{

        const response = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings", {
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

const newBookings = async (data,token) => {
    try{

        const response = await axios.post("https://apibookingsaccomodations-production.up.railway.app/api/V1/booking",data, {
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){

        console.error("Error al guardar la reservación", error);

        // Devuelve un objeto de error c
        return {
            success: false,
            message: error.response?.data?.message || "Error inesperado al guardar la reservación.",
        };
    }
}
const cancelBooking = async (id, data,token) => {
    try {
        const response = await axios.patch(`https://apibookingsaccomodations-production.up.railway.app/api/V1/status_booking/${id}`, data, {
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

const getBookingsByAccomodation = async (id,token) => {
    try{

        const response = await axios.get(`https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings/calendar/${id}`, {
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

export { getBookings,newBookings,cancelBooking,getBookingsByAccomodation }