import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useForm } from 'react-hook-form'
import { newAccomodation } from '../../services/accomodationServices';
import styles from '../../styles/accomodation/NewAccomodation.module.css';

export default function NewAccomodation({ showModal, handleCloseModal }) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

     //funcion para guardar un alojamiento
  const guardarAlojamiento = async (data) => {
        console.log(data);
    
        //validamos si el token existe
        const session_token = sessionStorage.getItem('token_bookings');
        
        if(session_token){//si existe el token, guardamos el alojamiento
        const response = await newAccomodation(data);
        console.log(response);
        handleCloseModal(); // Cerrar el modal después de guardar la reservación
        reset(); // Resetear el formulario después de guardar
        //aqui poner alertas con sweetalert
        
        }
    
    }


  return (
    <div >
  
        {/* Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`  } style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                 <div className="modal-dialog " role="document">
                    <div className={ ` modal-content ${styles.cont } `} >           
                       <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"  style={{ textAlign: 'center', width: '100%' }} >Nuevo Alojamiento</h5>
                            
                        </div>
                        <div className="modal-body">
                           <form onSubmit={handleSubmit(guardarAlojamiento)}>
                               <div className="form-group">
                                    <label htmlFor="name_alojamiento" className="col-form-label">Nombre*</label>
                                    <input type="text" className="form-control" id="name_alojamiento"  {...register("name", {required: true})} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name_direccion" className="col-form-label">Dirección*</label>
                                    <input type="text" className="form-control" id="name_direccion"  {...register("address", {required: true})} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Descripcion</label>
                                    <textarea className="form-control" id="message-text" {...register("description", {required: true})}></textarea>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className={`${styles.btnCancelar} `} onClick={handleCloseModal}>Cancelar</button>
                                    <button type="submit" className={`${styles.btnGuardar} `}>Guardar Cambios</button>
                                </div>
                            </form>           
                        </div>            
                           
                    </div>
                </div>
            </div>                                  
    </div>
  )
}
