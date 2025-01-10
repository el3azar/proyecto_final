import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getAccomodations } from '../../services/accomodationServices';

import { getIdUser,getToken } from '../Login';
import { newBookings } from '../../services/bookingServices'
import styles from '../../styles/bookings/NewBooking.module.css';


export default function NewBooking({ showModal, handleCloseModal}) {
  
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    //estado para guardar los alojamientos
    const [accomodations, setAccomodations] = useState([])

    //metodo para obtener los alojamientos para el combobox
    const fetchData = async (session_token) => {
        const response = await getAccomodations(session_token) //si esto es un exito devolvera un arreglo de alojamientos
        setAccomodations(response);
    }
    useEffect(() => {
            //validamos si el token existe
            const session_token = sessionStorage.getItem('token_bookings');
            if(session_token){
                fetchData(session_token)
            }
        }, [])

   //funcion para guardar una reservacion
  const guardarReservacion = async (data) => {
      console.log(data);
      const id= await getIdUser();
      console.log("el id es: ",id); 
      //agregamos el id del usuario al objeto
      const newReservacion = {
        ...data,
        user_id: id, // Agregar el id del usuario
      };
      //validamos si el token existe
      const session_token = getToken();
      if(session_token){//si existe el token, guardamos la reservacion
        const response = await newBookings(newReservacion);
        console.log(response);
        handleCloseModal(); // Cerrar el modal después de guardar la reservación
        reset(); // Resetear el formulario después de guardar
      }
        console.log(newReservacion);
  }



  return (
    <div>
      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1" role="dialog" >
        <div className="modal-dialog" role="document">
          <div className={ ` modal-content ${styles.cont } `}>
            {/* header del modal */}
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"  style={{ textAlign: 'center', width: '100%' }}>Nueva Reservación</h5>
              
            </div>
            {/* cuerpo del modal */}
            <div className="modal-body">
              {/* Formulario */}
              <form onSubmit={handleSubmit(guardarReservacion)}>
                {/* Combobox con alojamientos */}
                <div className="form-group">
                    <label htmlFor="opciones" className="text-start">Alojamiento</label>
                    <select className="form-select" {...register("accomodation_id")} id='opciones'>
                        {
                            accomodations.map( (item) => {
                                    return (
                                        <option key={item.id} value={item.id} >{item.name}</option>
                                      )
                                  }
                                )
                        }
                    </select>
                   {console.log(watch("accomodation_id"))}
                </div>
                 {/* Input texts */}           
                <div className="form-group">
                  <label htmlFor="code_booking" className="col-form-label"> Booking</label>
                  <input type="text" className="form-control" id="code_booking" 
                  {...register("booking", {required: true})}/>
                </div>
                <div className="form-group">
                  <label htmlFor="total" className="col-form-label"> Total</label>
                  <input type="text" className="form-control" id="total" 
                  {...register("total_amount", {required: true})}/>
                </div>
                
                {/* Seccion de fechas */}
                <section className="form-group d-flex justify-content-between ">
                    <div className='col-5'>
                        <label htmlFor="start-date" className="col-form-label">Fecha de Inicio</label>
                        <input type="date" className="form-control" id="start-date" {...register("check_in_date")} />
                    </div>
                    <div className='col-5'>
                        <label htmlFor="end-date" className="col-form-label">Fecha Final</label>
                        <input type="date" className="form-control" id="end-date" {...register("check_out_date")} />
                    </div>
                </section>

                {/* Footer del modal, se agrego dentro del form para que funcione el boton submit */}
                <div className={`modal-footer ${styles.mfB} `}>
                  <button type="button" className={`${styles.btnCancelarB} `} onClick={handleCloseModal} >Cancelar</button>
                  <button type="submit" className={`${styles.btnGuardarB} `}  >Guardar</button>
                </div>

              </form>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
