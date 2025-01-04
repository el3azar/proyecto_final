import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useForm } from 'react-hook-form'
import { getToken } from './Login';
import { newAccomodation } from '../services/accomodationServices';

export default function NewAccomodation({ showModal, handleCloseModal }) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

     //funcion para guardar un alojamiento
  const guardarAlojamiento = async (data) => {
        console.log(data);
    
        //validamos si el token existe
        const session_token = getToken();
        
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
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                 <div className="modal-dialog" role="document">
                    <div className="modal-content">           
                       <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Nuevo Alojamiento</h5>
                            <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
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
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                                </div>
                            </form>           
                        </div>            
                           
                    </div>
                </div>
            </div>                                  
    </div>
  )
}
