import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getToken } from '../Login';
import { cancelBooking } from '../../services/bookingServices'
import styles from '../../styles/bookings/CancelarBooking.module.css';

export default function CancelarBooking({showModalCancel, handleCloseModalCancel,selectedBooking}) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({defaultValues: selectedBooking});
       
        // Resetear los valores del formulario cuando selectedBooking cambie
        useEffect(() => {
            if (selectedBooking) {
            reset(selectedBooking); // Resetear con los valores de selectedBooking
            }
        }, [selectedBooking, reset]); //significa que se va a ejecutar cada vez que selectedBooking cambie
    
       //funcion para guardar una reservacion
      const cancelarReservacion = async (data) => {
        //en vez de usar el data.id se puede usar el selectedBooking.id
         
          const estado= {
            status:"CANCELLED"
          };
          console.log("estado: ",estado);
          //validamos si el token existe
          const session_token = sessionStorage.getItem('token_bookings');
          if(session_token){//si existe el token, guardamos la reservacion
            const response = await cancelBooking(data.id,estado);
            console.log(response);
            handleCloseModalCancel(); // Cerrar el modal después de guardar la reservación
            //alerta de confirmacion
          }
            
      }
    
  return (
    <div>
    {/* Modal */}
    <div className={`modal fade ${showModalCancel ? "show" : ""}`} style={{ display: showModalCancel ? "block" : "none" }} tabIndex="-1" role="dialog" >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* header del modal */}
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Detalles de la Reservación</h5>
            <button type="button" className="close" onClick={handleCloseModalCancel} aria-label="Close" >
            <span aria-hidden="true">&times;</span> </button>
          </div>
          {/* cuerpo del modal */}
          <div className="modal-body">
            {/* Formulario */}
            <form onSubmit={handleSubmit(cancelarReservacion)}>
              {/* Combobox con alojamientos */}
              <div className="form-group">
                  <label htmlFor="alojamiento" className="text-start">Alojamiento</label>
                  <input type='text' className="form-control" id='alojamiento' readOnly
                  {...register("accomodation", {required: true})} /> 
                 {console.log(watch("accomodation"))}
              </div>
               {/* Input texts */}           
              <div className="form-group">
                <label htmlFor="code_booking" className="col-form-label"> Booking</label>
                <input type="text" className="form-control" id="code_booking" readOnly
                {...register("booking", {required: true})}/>
              </div>
              <div className="form-group">
                <label htmlFor="total" className="col-form-label"> Total</label>
                <input type="text" className="form-control" id="total" readOnly
                {...register("total_amount", {required: true})}/>
              </div>
              <div className="form-group">
                <label htmlFor="total" className="col-form-label"> Status</label>
                <input type="text" className="form-control" id="total" readOnly
                {...register("status", {required: true})}/>
              </div>
              
              {/* Seccion de fechas */}
              <section className="form-group d-flex justify-content-between ">
                  <div className='col-5'>
                      <label htmlFor="start-date" className="col-form-label">Fecha de Inicio</label>
                      <input type="date" className="form-control" id="start-date" readOnly {...register("check_in_date")} />
                  </div>
                  <div className='col-5'>
                      <label htmlFor="end-date" className="col-form-label">Fecha Final</label>
                      <input type="date" className="form-control" id="end-date" readOnly {...register("check_out_date")} />
                  </div>
              </section>

              {/* Footer del modal, se agrego dentro del form para que funcione el boton submit */}
              <div className="modal-footer ">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModalCancel} >Cerrar</button>
                <button type="submit" className="btn btn-danger">Cancelar Reservación</button>
              </div>

            </form>

          </div>
          
        </div>
      </div>
    </div>
  </div>
  )
}
