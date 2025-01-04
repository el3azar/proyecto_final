import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import Navegacion from './Navegacion';
import { getBookings } from '../services/bookingServices'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NewBooking from './NewBooking';
import { getToken } from './Login';

export default function Bookings() {
    //estado para guardar las reservaciones
  const [bookings, setBookings] = useState([])
  //estado para verificar si el usuario esta autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  //estado para mostrar el modal
  const [showModal, setShowModal] = useState(false);


  //metodo para obtener las reservaciones
  const fetchData = async () => {
      const response = await getBookings() //si esto es un exito devolvera un arreglo de reservaciones
      setBookings(response);
  }
  //montamos las reservaciones al cargar la pagina
  useEffect(() => {
      //validamos si el token existe
      const session_token = getToken();
      if(session_token){
          setIsAuthenticated(true)
          //va poder visualizar los alojamientos
          fetchData()
      }else{
          setIsAuthenticated(false)
      }

  }, [])
//metodos para abrir y cerrar el modal
const handleShowModal = () => {
    setShowModal(true);
};

const handleCloseModal = () => {
    setShowModal(false)
};

  return (
      <div>
          {/** validamos si la persona esta autenticada */}
          {
              isAuthenticated ? (
                  <>
                      <Navegacion/>
                      <section className='d-flex justify-content-between'>
                      <h1>Lista de Reservaciones</h1>
                      <button className="btn btn-primary" onClick={() => handleShowModal()}><IoIosAddCircle />Nueva Reservacion</button>
                      </section>
                      <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Reserva</th>
                                        <th>Fecha de Registro</th>
                                        <th>Fecha de Salida</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Alojamiento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // mapeando los alojamientos
                                        bookings.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.booking}</td>
                                                    <td>{item.check_in_date}</td>
                                                    <td>{item.check_out_date}</td>
                                                    <td>{item.total_amount}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.accomodation}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                      </div>
                      
                        
                        {/* Modal 
                        Se pasa como props el estado showModal que ya va en true porque se activa al
                        darle en nueva reservacion y el metodo para cerrar el modal el cual se va a ejecutar en el modal
                        pero en el componente NewBooking
                        */} 
                        <NewBooking showModal={showModal} handleCloseModal={handleCloseModal}  />
                    
                        
          
                  </>
              ) : <h2>No estas autorizado, inicia sesion</h2>
          }
      </div>
  )
}
