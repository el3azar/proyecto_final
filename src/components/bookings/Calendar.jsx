import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAccomodations } from '../../services/accomodationServices';
import { getToken } from '../Login';
import { getBookingsByAccomodation } from '../../services/bookingServices';
import FullCalendar from '@fullcalendar/react'; // Importar FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin para vista de cuadrícula (mes/día)
import Navegacion from '../Navegacion';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/bookings/Calendar.module.css';

export default function () {
  const { register, handleSubmit } = useForm();
  const [accomodations, setAccomodations] = useState([]); // Estado para alojamientos
  const [bookings, setBookings] = useState([]); // Estado para reservaciones
  //estado para verificar si el usuario esta autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate= useNavigate()
  // Método existente: obtener alojamientos
  const fetchData = async (session_token) => {
    const response = await getAccomodations(session_token);
    setAccomodations(response);
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
    color: item.status === 'CONFIRMED' ? 'green' : 'red', // Colores según el estado
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
            <section>
              <h3>Seleccione el alojamiento</h3>
              <form onSubmit={handleSubmit(calendario)}>
                {/* Sección del combobox */}
                <select className="form-select" {...register('accomodation_id')} id="opciones">
                  {accomodations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="mt-5">
                  <button type="submit" className="btn btn-primary">
                    Filtrar
                  </button>
                </div>
              </form>
            </section>

            <section className="mt-5">
              
              {/* Nuevo: Renderizar FullCalendar */}
              <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  locale="es"
                  headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,dayGridWeek',
                  }}
                  height="auto"
                  eventContent={(eventInfo) => {
                      return (
                      <div style={{
                          backgroundColor: 
            eventInfo.event.extendedProps.status === 'CONFIRMED'
              ? '#d4edda' // Verde claro para confirmados
              : eventInfo.event.extendedProps.status === 'CANCELLED'
              ? '#f8d7da' // Rojo claro para cancelados
              : 'white',
                          border: '1px solid #ddd', // Borde gris claro
                          borderRadius: '8px', // Bordes redondeados
                          padding: '8px', // Espaciado interno
                          fontSize: '0.9rem', // Tamaño de fuente
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra
                          textAlign: 'left', // Alineación del texto
                          width: '100%', // Ancho del contenedor
                          }} >
                              
                          <strong style={{ color: 'black', fontSize: '1rem' }}>{eventInfo.event.title}</strong>
                          <p style={{ margin: '4px 0', color: '#555', fontSize: '0.7rem' }}>
                          Fecha de creación: {new Date(eventInfo.event.start).toLocaleDateString('es-ES')}
                          </p>
                          <p style={{ margin: '4px 0', color: '#555', fontSize: '0.8rem' }}>
                              Estado: {eventInfo.event.extendedProps.status} </p>
                          <p style={{ margin: '4px 0', color: '#555', fontSize: '0.8rem' }}>
                          Total: ${eventInfo.event.extendedProps.total_amount}</p>

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
