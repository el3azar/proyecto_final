import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getAccomodations } from '../../services/accomodationServices';
import Swal from 'sweetalert2';
import { getIdUser,getToken } from '../Login';
import { newBookings } from '../../services/bookingServices'
import styles from '../../styles/bookings/NewBooking.module.css';


export default function NewBooking({ showModal, handleCloseModal}) {
  
    const { register, handleSubmit, reset,setValue, watch, formState: { errors } } = useForm();
    //estado para guardar los alojamientos
    const [accomodations, setAccomodations] = useState([])

    //metodo para obtener los alojamientos para el combobox
    const fetchData = async (session_token) => {
        const response = await getAccomodations(session_token) //si esto es un exito devolvera un arreglo de alojamientos
        setAccomodations(response);
        // Establecer la primera opción como predeterminada si hay datos
        if (response.length > 0) {
          setValue("accomodation_id", response[0].id);
        }
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
        console.log(response.message);
        // Validar si ocurrió un error
        if (!response.success) {
              // Si la operación fue exitosa
            Swal.fire({
              title: "Éxito",
              text: "Reservación guardada exitosamente.",
              icon: "success",
              confirmButtonText: "Ok",
          });
          handleCloseModal();
          reset();
        }else{
          Swal.fire({
            title: "Error",
            text: response.message || "No se pudo guardar la reservación.",
            icon: "error",
            confirmButtonText: "Ok",
         });
        
        }

        
      }
      
  }



  return (
    <div>
      {/* Modal */}
      <div  className={`modal fade ${showModal ? "show" : ""} data-bs-backdrop="true" `} style={{ display: showModal ? "block" : "none" }} 
      tabIndex="-1" role="dialog" data-bs-backdrop="true"  onClick={handleCloseModal}  >
        <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
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
                  <select className={`form-select ${errors.accomodation_id ? "is-invalid" : ""}`}
                    {...register("accomodation_id", { required: "Por favor selecciona un alojamiento." })} id="opciones">
                    {accomodations.map((item) => (
                      <option key={item.id} value={item.id}> {item.name}</option>
                    ))}
                  </select>
                  {/* Mensaje de error */}
                  {errors.accomodation_id && (
                    <div className="invalid-feedback">{errors.accomodation_id.message}</div>
                  )}
                </div>

                {/* Input de Booking */}
                <div className="form-group">
                  <label htmlFor="code_booking" className="col-form-label">Booking</label>
                  <input type="text" className={`form-control ${errors.booking ? "is-invalid" : ""}`} id="code_booking"
                    {...register("booking", { required: "El código de booking es obligatorio." })} />
                  {/* Mensaje de error */}
                  {errors.booking && (<div className="invalid-feedback">{errors.booking.message}</div> )}
                </div>

                {/* Input de Total */}
                <div className="form-group">
                  <label htmlFor="total" className="col-form-label">Total</label>
                  <input type="text" className={`form-control ${errors.total_amount ? "is-invalid" : ""}`} id="total"
                    {...register("total_amount", { required: "El total es obligatorio." })}/>
                  {/* Mensaje de error */}
                  {errors.total_amount && (<div className="invalid-feedback">{errors.total_amount.message}</div>)}
                </div>

                {/* Sección de Fechas */}
                <section className="form-group d-flex justify-content-between">
                  <div className="col-5">
                    <label htmlFor="start-date" className="col-form-label">Fecha de Inicio</label>
                    <input type="date" className={`form-control ${errors.check_in_date ? "is-invalid" : ""}`} id="start-date"
                      {...register("check_in_date", { required: "La fecha de inicio es obligatoria." })}/>
                    {/* Mensaje de error */}
                    {errors.check_in_date && ( <div className="invalid-feedback">{errors.check_in_date.message}</div>)}
                  </div>
                  <div className="col-5">
                    <label htmlFor="end-date" className="col-form-label">Fecha Final</label>
                    <input type="date" className={`form-control ${errors.check_out_date ? "is-invalid" : ""}`} id="end-date"
                      {...register("check_out_date", { required: "La fecha final es obligatoria." })}/>
                    {/* Mensaje de error */}
                    {errors.check_out_date && ( <div className="invalid-feedback">{errors.check_out_date.message}</div>)}
                  </div>
                </section>

                {/* Footer del modal */}
                <div className={`modal-footer ${styles.mfB}`}>
                  <button type="button" className={`${styles.btnCancelarB}`} onClick={handleCloseModal}>Cancelar</button>
                  <button type="submit" className={`${styles.btnGuardarB}`}> Guardar</button>
                </div>
              </form>


            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
