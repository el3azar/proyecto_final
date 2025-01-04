import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './Login'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navegacion from './Navegacion';


export default function Home() {
    //estado donde vamos a verificar si el usuario esta autenticado
  const [user, setUser] = useState(false)
    const navigate = useNavigate()
  //metodo para verificar si el usuario esta autenticado
  useEffect(() => {
    const user_token = sessionStorage.getItem('token_bookings')
    if (user_token) {
      setUser(true)
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
        ) : <Login />
      }
      
    </div>
  );
}