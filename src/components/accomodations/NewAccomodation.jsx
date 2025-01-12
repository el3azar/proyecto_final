import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useForm } from 'react-hook-form'
import { newAccomodation } from '../../services/accomodationServices';
import styles from '../../styles/accomodation/NewAccomodation.module.css';
import Swal from 'sweetalert2';

export default function NewAccomodation({ showModal, handleCloseModal }) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

     //funcion para guardar un alojamiento
  const guardarAlojamiento = async (data) => {
        console.log(data);
    
        //validamos si el token existe
        const session_token = sessionStorage.getItem('token_bookings');
        
        if(session_token){//si existe el token, guardamos el alojamiento
        const response = await newAccomodation(data,session_token);
        console.log(response);
        
        Swal.fire({
            title: "Alojamiento almacenado con exito!",
            icon: "success",
            draggable: true,
            timer: 3000,
            showConfirmButton: false ,
            background: "#d9e5f1"
        });
        handleCloseModal(); // Cerrar el modal después de guardar la reservación
        reset(); // Resetear el formulario después de guardar
        }
    
    }


  return (
    <div >
  
        {/* Modal */}
            <main className={`modal fade ${showModal ? 'show' : ''}`  } style={{ display: showModal ? 'block' : 'none' }} 
            tabIndex="-1" role="dialog" data-bs-backdrop="true"  onClick={handleCloseModal}>
                 <section className="modal-dialog " role="document" onClick={(e) => e.stopPropagation()}>
                    <div className={ ` modal-content ${styles.cont } `} >           
                       <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"  style={{ textAlign: 'center', width: '100%' }} >Nuevo Alojamiento</h5>
                            
                        </div>
                        <div className="modal-body">
                           <form onSubmit={handleSubmit(guardarAlojamiento)}>
                               <article className="form-group">
                                    <label htmlFor="name_alojamiento" className="col-form-label">Nombre*</label>
                                    <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} 
                                    id="name_alojamiento" {...register("name", { required: "El nombre es obligatorio" })} />
                                    
                                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                </article>
                                <article className="form-group">
                                    <label htmlFor="name_direccion" className="col-form-label">Dirección*</label>
                                    <input type="text" className={`form-control ${errors.address ? "is-invalid" : ""}`} 
                                    id="name_direccion"{...register("address", { required: "La dirección es obligatoria" })} />
                                   
                                    {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                </article>

                                <article className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Descripción</label>
                                    <textarea className={`form-control ${errors.description ? "is-invalid" : ""}`} 
                                    id="message-text"  
                                    {...register("description", { required: "La descripción es obligatoria" })}>
                                    </textarea>
                                    
                                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                                </article>

                                <article className="modal-footer">
                                    <button type="button" className={`${styles.btnCancelar} `} onClick={handleCloseModal}>Cancelar</button>
                                    <button type="submit" className={`${styles.btnGuardar} `}>Guardar Cambios</button>
                                </article>
                            </form>           
                        </div>            
                           
                    </div>
                </section>
            </main>                                  
    </div>
  )
}
