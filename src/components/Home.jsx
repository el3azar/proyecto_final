import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navegacion from './Navegacion';
import styles from '../styles/Home.module.css';
import { getAccomodations } from '../services/accomodationServices'
import { FaSpinner } from 'react-icons/fa';



export default function Home() {
  //estado donde vamos a verificar si el usuario esta autenticado
  const [user, setUser] = useState(false)
  //estado para guardar los alojamientos
  const [accomodations, setAccomodations] = useState([])
  //estado para la carga de datos
  const [loading, setLoading] = useState(true)


  const navigate = useNavigate()

  //metodo para verificar si el usuario esta autenticado
  useEffect(() => {
    const user_token = sessionStorage.getItem('token_bookings')
    if (user_token) {
      setUser(true)
       //va poder visualizar los alojamientos
       fetchData(user_token)
    }else {
      navigate('/'); // Redirigir a la ruta raíz si no hay token
    }
  }, [])

  //metodo para obtener la respuesta de la api de accomodation
  const fetchData = async (session_token) => {
    try{
      const response = await getAccomodations(session_token) //si esto es un exito devolvera un arreglo de alojamientos
      setAccomodations(response);
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  
}


  return (
    <div> 
    
      {
        user ? (
          <>
            <header>
              <Navegacion/>
            </header>

            {/* Parte de carga de datos */}
            
            {loading && (
              <div className="text-center mt-4">
                <p>Cargando datos, por favor espera...</p>
                <FaSpinner className="spinner" />
              </div>
            )}
            
            {
              !loading && (
                <>
                  <main className={styles.hero}>
                    {/* Contenido principal */}
                    <h1 className={`mt-5 ${styles.overlay}`}>BIENVENIDOS A LA APP DE ALOJAMIENTOS Y RESERVACIONES</h1>
                  </main>
                  {/* Destinations */}
                  <section className="container destinations py-5">
                    <div className="row">

                      {
                        accomodations.slice(0, 6).map((item) =>(
                          <article className="col-md-4 mt-4 col-6" key={item.id}>
                            <Link to={`/alojamientos`} className="text-decoration-none" title={`Ver más sobre ${item.name}`}>
                                <div className="card h-100">
                                  <img src={item.image} className="card-img-top" alt={item.name}/>
                                  <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.address}</p>
                                  </div>
                                </div>
                              </Link>
                          </article>

                        ))
                      }
                    
                    </div>
                </section>
              </>
              )
            }

         
          </>
        ) : ( <h2>Redirigiendo...</h2>)
      }
      
    </div>
  );
}