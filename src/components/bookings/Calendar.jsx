import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAccomodations } from '../../services/accomodationServices';
import { getToken } from '../Login';
import { getBookingsByAccomodation } from '../../services/bookingServices';
import FullCalendar from '@fullcalendar/react'; // Importar FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin para vista de cuadrícula (mes/día)
import timeGridPlugin from '@fullcalendar/timegrid';
import Navegacion from '../Navegacion';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/bookings/Calendar.module.css';
import esLocale from '@fullcalendar/core/locales/es';


export default function () {
  const { register, handleSubmit,setValue } = useForm();
  const [accomodations, setAccomodations] = useState([]); // Estado para alojamientos
  const [bookings, setBookings] = useState([]); // Estado para reservaciones
  //estado para verificar si el usuario esta autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate= useNavigate()
  // Método existente: obtener alojamientos
  const fetchData = async (session_token) => {
    const response = await getAccomodations(session_token);
    setAccomodations(response);
    if (response.length > 0) {
      setValue("accomodation_id", response[0].id);
    }
  };

  // Método existente: filtrar reservaciones por alojamiento
  const getBookingsFilter = async (id,session_token) => {
    const response = await getBookingsByAccomodation(id,session_token);
    setBookings(response);
  };

  // Método existente: manejar el filtrado (sin cambios)
  const calendario = async (data) => {
    const session_token = sessionStorage.getItem('token_bookings');
    if (session_token) {
      getBookingsFilter(data.accomodation_id,session_token);
    }
    console.log(data);
  };

  //  transformar las reservaciones en eventos para FullCalendar
  const events = bookings.map((item) => ({
    title: item.booking, // Mostrar el código de la reservación
    start: item.created_at, // Fecha de creación (por día, mes, año)
    
    extendedProps: { // Información adicional que se puede acceder en `eventContent`
        status: item.status, // Estado de la reservación
        total_amount: item.total_amount, // Monto total
        check_out_date: item.check_out_date, // Fecha de salida
    },
  }));

  useEffect(() => {
    const session_token = sessionStorage.getItem('token_bookings');
    if (session_token) {
      fetchData(session_token); // Método existente
      setIsAuthenticated(true)
    }else{
      setIsAuthenticated(false)
      navigate('/'); // Redirigir a la ruta raíz si no hay token
    }
  }, []);

  return (
    <div>
      {
        isAuthenticated ? (
        <>
            <header>
              <Navegacion />
            </header>
            <h1>Calendario</h1>
            <section className='container ' style={{ display: 'col', textAlign:"center" }}>
              <h4>Seleccione el alojamiento</h4>
              <form onSubmit={handleSubmit(calendario)} style={{ display: 'flex', alignItems: 'center', gap: '10px', alignContent:'center', justifyContent:'center'}}>
                {/* Sección del combobox */}
                <select className="form-select w-25" {...register('accomodation_id')} id="opciones">
                  {accomodations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="mt-2">
                  <button type="submit" className={`${styles.customBtn} `} >
                    Filtrar
                  </button>
                </div>
              </form>
            </section>

            <section className="mt-5 container">
              
              {/* Nuevo: Renderizar FullCalendar */}
              <FullCalendar plugins={[dayGridPlugin,timeGridPlugin]} initialView="dayGridMonth" events={events} locale={esLocale}
                  headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,dayGridWeek',
                  }}
                  height="auto"
                  aspectRatio={1.5}
                  eventContent={(eventInfo) => {
                    const statusClass =
                      eventInfo.event.extendedProps.status === 'CONFIRMED' ? styles.confirmed
                        : eventInfo.event.extendedProps.status === 'CANCELLED' ? styles.cancelled
                        : styles.default;

                      return (
                        <div className={`${styles.eventContainer} ${statusClass}`}>
                          <strong className={styles.eventTitle}>{eventInfo.event.title}</strong>
                          <p className={styles.parrafo}>
                            check in: {new Date(eventInfo.event.start).toLocaleDateString('es-ES')}
                          </p>
                          <p className={styles.parrafo}>
                            Estado: {eventInfo.event.extendedProps.status}
                          </p>
                          <p className={styles.parrafo}>
                            Total: ${eventInfo.event.extendedProps.total_amount}
                          </p>
                      </div>
                      );
                  }}
              />


            </section>
          </>
        ) : (<h2>Redirigiendo...</h2>)
      }
      
    </div>
  );
}
