import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './Login'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navegacion from './Navegacion';
import styles from '../styles/Home.module.css';


export default function Home() {
    //estado donde vamos a verificar si el usuario esta autenticado
  const [user, setUser] = useState(false)
    const navigate = useNavigate()
  //metodo para verificar si el usuario esta autenticado
  useEffect(() => {
    const user_token = sessionStorage.getItem('token_bookings')
    if (user_token) {
      setUser(true)
    }else {
      navigate('/'); // Redirigir a la ruta raíz si no hay token
    }
  }, [])

  return (
    <div> 
    
      {
        user ? (
          <>
          <header>
            <Navegacion/>
          </header>

          <main className={styles.hero}>
          {/* Contenido principal */}
          <h1 className={`mt-5 ${styles.overlay}`}>BIENVENIDOS A LA APP DE ALOJAMIENTOS Y RESERVACIONES</h1>
           </main>
          
      
      {/* Destinations */}
      <section className="container destinations py-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://res.cloudinary.com/dqo8icjui/image/upload/v1736293282/alojamientos/m7ldzromeovb4tssh3px.webp"
                className="card-img-top"
                alt="Hawaii"
              />
              <div className="card-body">
                <h5 className="card-title">Surf the waves of Hawaii</h5>
                <p className="card-text">Pay monthly from £74.07</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://source.unsplash.com/400x300/?beach"
                className="card-img-top"
                alt="Bora Bora"
              />
              <div className="card-body">
                <h5 className="card-title">Paradise vacation</h5>
                <p className="card-text">Pay monthly from £74.07</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://source.unsplash.com/400x300/?island"
                className="card-img-top"
                alt="Fiji"
              />
              <div className="card-body">
                <h5 className="card-title">Explore Fiji's fantasy coast</h5>
                <p className="card-text">Pay monthly from £74.07</p>
              </div>
            </div>
          </div>
        </div>
      </section>

         
          </>
        ) : ( <h2>Redirigiendo...</h2>)
      }
      
    </div>
  );
}