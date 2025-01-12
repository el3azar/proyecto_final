import React,{useEffect,useState} from 'react'
import { useForm } from "react-hook-form";
import { updateAccomodation } from '../../services/accomodationServices';
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
          title: "¿Estás seguro?",
          text: "Esta acción actualizará el alojamiento.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#021334",
          cancelButtonColor: "#032b66", 
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
          background: "#d9e5f1", // Fondo claro
          color: "#333333", // Color del texto
          
          
        }).then(async(result) => {
            if (result.isConfirmed) {
              //recibimos la data de la api
              const response = await updateAccomodation(data.id, accomodation, session_token);
              console.log(response);  
              Swal.fire({
                title: "Actualizado!",
                text: "El alojamiento ha sido actualizado.",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,  // No muestra el botón de confirmación
                background: "#d9e5f1", // Fondo claro
                color: "#333333", // Color del texto
              });
              handleCloseModalUpdate(); // Cerrar el modal después de cancelar
            }
          });
      }
  }

  return (
   <div>
    
         <main className={`modal fade ${showModalUpdate ? "show" : ""}`} style={{ display: showModalUpdate ? "block" : "none" }} 
            tabIndex="-1" role="dialog" data-bs-backdrop="true"  onClick={handleCloseModalUpdate}>
            <div className="modal-dialog modal-dialog-centered " role="document" onClick={(e) => e.stopPropagation()}>

              <div className={ `modal-content ${styles.cont } `}>
               
                  <h2 className="text-center mb-4 mt-3">Actualizar Información</h2>
               
            
                <section className="modal-body container " style={{display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
                    
                      <form onSubmit={handleSubmit(updateAlojamiento)} className="row g-3 w-100">
                        {/* Campo ID (solo lectura) */}
                        <article  className="col-md-12">
                          <label htmlFor="id" className="form-label">ID</label>
                          <input type="text" className="form-control " id="id" readOnly {...register("id")} />
                        </article>

                        {/* Campo Nombre */}
                        <article  className="col-md-12 ">
                          <label htmlFor="name" className="form-label"> Nombre </label>
                          <input type="text" className={`form-control  ${errors.name ? "is-invalid" : ""} `} id="name"
                            {...register("name", { required: "El nombre es obligatorio" })}/>

                          {errors.name && ( <div className="invalid-feedback">{errors.name.message}</div>)}
                        </article>

                        {/* Campo Descripción */}
                        <article  className="col-md-12">
                          <label htmlFor="description" className="form-label"> Descripción </label>
                          <textarea className={`form-control ${styles.textareaa} ${errors.description ? "is-invalid" : ""} `} id="description" 
                            {...register("description", { required: "La descripción es obligatoria" })}></textarea>
                          {errors.description && (<div className="invalid-feedback">{errors.description.message}</div> )}
                        </article>

                        {/* Campo Dirección */}
                        <article  className="col-md-12">
                          <label htmlFor="address" className="form-label"> Dirección</label>
                          <input type="text"  className={`form-control ${errors.address ? "is-invalid" : ""}`} id="address"
                            {...register("address", { required: "La dirección es obligatoria" })}/>
                          {errors.address && ( <div className="invalid-feedback">{errors.address.message}</div> )}
                        </article>

                        {/* Botón de enviar */}
                        <article className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                          <button type='button' onClick={handleCloseModalUpdate} className={`me-4 text-decoration-none text-black ${styles.btnRegresar} `} ><IoIosArrowRoundBack />Regresar</button>
                          <button type="submit" className={`${styles.btnActualizar}`}> Actualizar</button>
                          
                        </article>
                      </form>
                </section>


              </div>
            </div>
          </main>       
   
   </div>
    
  
  )
}
