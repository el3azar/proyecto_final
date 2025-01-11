import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cancelBooking } from '../../services/bookingServices'
import styles from '../../styles/bookings/CancelarBooking.module.css';
import Swal from 'sweetalert2';

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
     //validamos si el token existe
      const session_token = sessionStorage.getItem('token_bookings');
      if(session_token){//si existe el token, guardamos la reservacion
        // Mostrar la alerta de confirmación con SweetAlert2
        Swal.fire({
              title: '¿Estás seguro?',
              text: 'Esta acción no se puede deshacer',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, cancelar',
              cancelButtonText: 'No, volver',
        }).then(async (result) => {
          if (result.isConfirmed) {
              // Si el usuario confirma la cancelación, procedemos con la llamada API
              const estado = { status: "CANCELLED" };
              console.log("estado: ",estado);
              //en vez de usar el data.id se puede usar el selectedBooking.id
              const response = await cancelBooking(data.id, estado);
              if (response) {
                Swal.fire({
                  title: 'Reservación cancelada',
                  icon: 'success',
                  timer: 3000,  // Tiempo en milisegundos (3000 ms = 3 segundos)
                  timerProgressBar: true,  // Muestra una barra de progreso
                  showConfirmButton: false  // No muestra el botón de confirmación
                }); 
                handleCloseModalCancel(); // Cerrar el modal después de cancelar
              }else {
                Swal.fire('Error al cancelar la reservación', 'Inténtalo nuevamente', 'error');
              }
            }
        });
      }
            
    }
    
  return (
    <div>
    {/* Modal */}
    <main className={`modal fade ${showModalCancel ? "show" : ""}`} style={{ display: showModalCancel ? "block" : "none" }} 
    tabIndex="-1" role="dialog" data-bs-backdrop="true"  onClick={handleCloseModalCancel}>
      <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
        <section className={ ` modal-content ${styles.cont } `}>
          {/* header del modal */}
          <section className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"  style={{ textAlign: 'center', width: '100%' }}>Detalles de la Reservación</h5>
          </section>
          {/* cuerpo del modal */}
          <section className="modal-body">
            {/* Formulario */}
            <form onSubmit={handleSubmit(cancelarReservacion)}>
              {/* Combobox con alojamientos */}
              <article className="form-group">
                  <label htmlFor="alojamiento" className="text-start">Alojamiento</label>
                  <input type='text' className="form-control" id='alojamiento' readOnly
                  {...register("accomodation", {required: true})} /> 
                 {console.log(watch("accomodation"))}
              </article>
               {/* Input texts */}           
              <article className="form-group">
                <label htmlFor="code_booking" className="col-form-label"> Booking</label>
                <input type="text" className="form-control" id="code_booking" readOnly
                {...register("booking", {required: true})}/>
              </article>
              <article className="form-group">
                <label htmlFor="total" className="col-form-label"> Total</label>
                <input type="text" className="form-control" id="total" readOnly
                {...register("total_amount", {required: true})}/>
              </article>
              <article className="form-group">
                <label htmlFor="total" className="col-form-label"> Status</label>
                <input type="text" className="form-control" id="total" readOnly
                {...register("status", {required: true})}/>
              </article>
              
              {/* Seccion de fechas */}
              <article className="form-group d-flex justify-content-between ">
                  <div className='col-5'>
                      <label htmlFor="start-date" className="col-form-label">Fecha de Inicio</label>
                      <input type="date" className="form-control" id="start-date" readOnly {...register("check_in_date")} />
                  </div>
                  <div className='col-5'>
                      <label htmlFor="end-date" className="col-form-label">Fecha Final</label>
                      <input type="date" className="form-control" id="end-date" readOnly {...register("check_out_date")} />
                  </div>
              </article>

              {/* Footer del modal, se agrego dentro del form para que funcione el boton submit */}
              <article className="modal-footer ">
                <button type="button" className={`${styles.btnCerrar} `} onClick={handleCloseModalCancel} >Cerrar</button>
                <button type="submit" className={`${styles.btnGuardar} `} >Cancelar Reservación</button>
              </article>

            </form>

          </section>
          
        </section>
      </div>
    </main>
  </div>
  )
}
