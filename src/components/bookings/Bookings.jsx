import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import Navegacion from '../Navegacion';
import { getBookings } from '../../services/bookingServices'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NewBooking from './NewBooking';
import { getToken } from '../Login';
import CancelarBooking from './CancelarBooking';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/bookings/Bookings.module.css';

export default function Bookings() {
    //estado para guardar las reservaciones
  const [bookings, setBookings] = useState([])
  //estado para verificar si el usuario esta autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  //estado para mostrar el modal de nueva reservacion
  const [showModal, setShowModal] = useState(false);
//estado para mostrar el modal de cancelar reservacion
  const [showModalCancel, setShowModalCancel] = useState(false);
  // Estado adicional para la reserva seleccionada
 const [selectedBooking, setSelectedBooking] = useState(null);
 //estado para la carga de datos
 const [loading, setLoading] = useState(true)

 const navigate = useNavigate()

  //metodo para obtener las reservaciones
  const fetchData = async (session_token) => {
    try{
        const response = await getBookings(session_token) //si esto es un exito devolvera un arreglo de reservaciones
        setBookings(response);
    }catch(error){
        console.log(error)
    }finally{
        setLoading(false)
    }
     
  }
  //montamos las reservaciones al cargar la pagina
  useEffect(() => {
      //validamos si el token existe
      const session_token = sessionStorage.getItem('token_bookings');
      if(session_token){
          setIsAuthenticated(true)
          //va poder visualizar los alojamientos
          fetchData(session_token)
      }else{
          setIsAuthenticated(false)
          navigate('/'); // Redirigir a la ruta raíz si no hay token
      }

  }, [])
//metodos para abrir y cerrar el modal
const handleShowModal = () => {
    setShowModal(true);
};

const handleCloseModal = () => {
    setShowModal(false)
    const session_token = sessionStorage.getItem('token_bookings');
      if(session_token){
          fetchData(session_token)
      }

};

//metodos para abrir y cerrar el modal de cancelar reservacion
const handleShowModalCancel = (item) => {
    setSelectedBooking(item); // Asigna el item seleccionado al estado
    setShowModalCancel(true);
    console.log(item);
};

const handleCloseModalCancel = () => {
    setShowModalCancel(false)
    const session_token = sessionStorage.getItem('token_bookings');
      if(session_token){
          fetchData(session_token)
      }
};

  return (
      <div>
          {/** validamos si la persona esta autenticada */}
          {
              isAuthenticated ? (
                  <>
                      <header>
                         <Navegacion/>
                      </header>
                      

                      {loading && (
                        <div className="text-center mt-4">
                            <p >Cargando datos...</p>
                        </div>
                      )}
                      {
                        !loading && (
                          <>
                            <section className='d-flex justify-content-between'>
                                 <h1>Lista de Reservaciones</h1>
                            </section>
                            <div className={`${styles.aline} `}>
                                <button className={`${styles.customBtn} `} onClick={() => handleShowModal()}><IoIosAddCircle />Nueva Reservacion</button>
                            </div>

                            <div className='container'>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead >
                                            <tr>
                                                <th>ID</th>
                                                <th>Reserva</th>
                                                <th>Fecha de Registro</th>
                                                <th>Fecha de Salida</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Alojamiento</th>
                                                <th>Cancelar</th>
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
                                                            <td>
                                                                {item.status === 'CONFIRMED' && <button className={`${styles.edit_btn} `} onClick={ () => handleShowModalCancel(item) }>Cancelar</button>}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                      
                            </div>
                            {/* Modal 
                             Se pasa como props el estado showModal que ya va en true porque se activa al
                             darle en nueva reservacion y el metodo para cerrar el modal el cual se va a ejecutar en el modal
                             pero en el componente NewBooking
                            */} 
                           <NewBooking showModal={showModal} handleCloseModal={handleCloseModal}  />
                           <CancelarBooking showModalCancel={showModalCancel} handleCloseModalCancel={handleCloseModalCancel} selectedBooking={selectedBooking} />
                          </>
                        )
                      }

                      
                      

                      

                      
                        
                        
                        
          
                  </>
              ) : <h2>No estas autorizado, inicia sesion</h2>
          }
      </div>
  )
}
