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
      <main>
        {/* Contenido principal */}
        <h1 className='mt-5'>BIENVENIDOS A LA APP DE ALOJAMIENTOS Y RESERVACIONES</h1>
      </main>
          </>
        ) : ( <h2>Redirigiendo...</h2>)
      }
      
    </div>
  );
}