import React,{useEffect,useState} from 'react'
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateAccomodation } from '../../services/accomodationServices';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/accomodation/UpdateAccomodation.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";
import Swal from 'sweetalert2';

export default function UpdateAccomodation({ showModalUpdate, handleCloseModalUpdate, selectedAccomodation }) {
  
   // Inicializamos el hook useForm
  const {register,handleSubmit,formState: { errors },reset} = useForm({defaultValues: selectedAccomodation});

  useEffect(() => {
    console.log("selectedAccomodation: ", selectedAccomodation);
    if (selectedAccomodation) {
      reset(selectedAccomodation); // Resetear con los valores del alojamiento seleccionado
      }
  
  }, [selectedAccomodation, reset]); //significa que se va a ejecutar cada vez que selectedAccomodation cambie

  const updateAlojamiento= async(data) =>{
      console.log(data.id);

      const accomodation = { name: data.name, description: data.description, address: data.address };

      console.log(accomodation);
       //validamos si el token existe
       const session_token = sessionStorage.getItem('token_bookings');  
      if(session_token){//si existe el token, guardamos el alojamiento
        Swal.fire({
          title: "¿Estas seguro?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!"
        }).then(async(result) => {
          if (result.isConfirmed) {
            //recibimos la data de la api
            const response = await updateAccomodation(data.id, accomodation);
            console.log(response);  
            Swal.fire({
              title: "Actualizado!",
              text: "El alojamiento ha sido actualizado.",
              icon: "success",
              timer: 3000,
              showConfirmButton: false  // No muestra el botón de confirmación
            });
            handleCloseModalUpdate(); // Cerrar el modal después de cancelar
          }
        });
      
      
      
      
      }
  
  }

  return (
   <div>
    
         <div className={`modal fade ${showModalUpdate ? "show" : ""}`} style={{ display: showModalUpdate ? "block" : "none" }} 
            tabIndex="-1" role="dialog" data-bs-backdrop="true"  onClick={handleCloseModalUpdate}>
            <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>

              <div className={ ` modal-content ${styles.cont } `}>
                <div className="modal-header">
                  <h2 className="text-center mb-4 mt-5">Actualizar Información</h2>
                </div>
            
                <div className="modal-body container mt-4 w-50" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    
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
                          <textarea className={`form-control ${styles.textareaa} ${errors.description ? "is-invalid" : ""} `} id="description" 
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
                        <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                          <button type='button' onClick={handleCloseModalUpdate} className={`me-4 text-decoration-none text-black ${styles.btnRegresar} `} ><IoIosArrowRoundBack />Regresar</button>
                          <button type="submit" className={`${styles.btnActualizar}`}> Actualizar</button>
                          
                        </div>
                      </form>
                </div>


              </div>
            </div>
          </div>       
   
   </div>
    
  
  )
}
