import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateAccomodation } from '../../services/accomodationServices';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/accomodation/UpdateAccomodation.module.css';

export default function UpdateAccomodation() {
  const location = useLocation();
  const navigate = useNavigate()
  const item = location.state?.item;
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  

   // Inicializamos el hook useForm
  const {register,handleSubmit,formState: { errors },reset} = useForm({defaultValues: item});

  useEffect(() => {
     //validamos si el token existe
     const session_token = sessionStorage.getItem('token_bookings');
      if(session_token){
          setIsAuthenticated(true)
             
        }else{
          setIsAuthenticated(false)
          navigate('/'); // Redirigir a la ruta raíz si no hay token
        }
  
  }, [])

  const updateAlojamiento= async(data) =>{
      console.log(data.id);

      const accomodation = { name: data.name, description: data.description, address: data.address };

      console.log(accomodation);
          
      if(isAuthenticated){//si existe el token, guardamos el alojamiento
      //recibimos la data de la api
      const response = await updateAccomodation(data.id, accomodation);
      console.log(response);
      
      //redireccionar a la pagina de alojamientos
      navigate('/alojamientos');
      
      
      }
  
  }

  return (
   <div>
    {
      isAuthenticated ?  (
     <>
        <div className="container mt-4">
          <h2 className="text-center mb-4">Actualizar Información</h2>
          <form onSubmit={handleSubmit(updateAlojamiento)} className="row g-3">
            {/* Campo ID (solo lectura) */}
            <div className="col-md-12">
              <label htmlFor="id" className="form-label">ID</label>
              <input type="text" className="form-control " id="id" readOnly {...register("id")} />
            </div>

            {/* Campo Nombre */}
            <div className="col-md-12 ">
              <label htmlFor="name" className="form-label"> Nombre </label>
              <input type="text" className={`form-control  ${errors.name ? "is-invalid" : ""} `} id="name"
                {...register("name", { required: "El nombre es obligatorio" })}/>

              {errors.name && ( <div className="invalid-feedback">{errors.name.message}</div>)}
            </div>

            {/* Campo Descripción */}
            <div className="col-md-12">
              <label htmlFor="description" className="form-label"> Descripción </label>
              <textarea className={`form-control ${errors.description ? "is-invalid" : ""}`} id="description" rows="3"
                {...register("description", { required: "La descripción es obligatoria" })}></textarea>
              {errors.description && (<div className="invalid-feedback">{errors.description.message}</div> )}
            </div>

            {/* Campo Dirección */}
            <div className="col-md-12">
              <label htmlFor="address" className="form-label"> Dirección</label>
              <input type="text"  className={`form-control ${errors.address ? "is-invalid" : ""}`} id="address"
                {...register("address", { required: "La dirección es obligatoria" })}/>
              {errors.address && ( <div className="invalid-feedback">{errors.address.message}</div> )}
            </div>

            {/* Botón de enviar */}
            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-primary"> Actualizar</button>
            </div>
          </form>
        </div>
    </>
    ): <h2>Acceso no autorizado</h2>
    }
    

   </div>
    
  
  )
}
