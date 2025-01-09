import axios from "axios";

//metodo para iniciar sesion
const login = async (user) => {
    try{
        //axios => es una libreria donde podemos hacer peticiones HTTP
        /**
         * Peticiones HTTP: GET, POST, PUT, DELETE, PATCH
         */
        const response = await axios.post("https://apibookingsaccomodations-production.up.railway.app/api/V1/login", user);
        return response.data;
    }catch(error){
        console.error("Error al autenticarse", error);
    }
}
//metood para obtener todos los usuarios
const getAllUser= async () => {
        try{
              
            const response  = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/users");
            return response.data;

        }catch(error){
            console.error("Error al autenticarse", error);
        }
    
}

const logout = () => {
   
    if (sessionStorage.getItem('token_bookings')) {
      sessionStorage.removeItem('token_bookings');
    }
    if (sessionStorage.getItem('correo_user')) {
      sessionStorage.removeItem('correo_user');
    }
  
  };
  
export { login, logout,getAllUser }