import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import styles from '../styles/Navegacion.module.css';
import { logout } from '../services/loginServices';
import Swal from 'sweetalert2';
import { TbBackground } from 'react-icons/tb';

export default function Navegacion() {
  const navigate = useNavigate();
  // Método para cerrar sesión
  const cerrar_sesion = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Tu sesión será cerrada y deberás iniciar sesión nuevamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // Llamar al método para cerrar sesión
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión exitosamente.",
          icon: "success",
          timer: 1500, // Tiempo en milisegundos
          showConfirmButton: false,
        }).then(() => {
          navigate("/"); // Redirigir al login
        });
      }
    });
  };
  return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
          <section className="container-fluid">
              <button className="navbar-toggler btn-primary" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation" style={{background:"#8aaedf"}}>
              <span className="navbar-toggler-icon"></span></button>

              <div className={`collapse navbar-collapse `} id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4 ">
                  <li className="nav-item ">
                    <Link to="/home" className={`nav-link active ${styles['nav-link']}`} aria-current="page" >Inicio</Link>
                  </li>
                  <li className="nav-item ">
                   <Link to="/alojamientos" className={`nav-link active ${styles['nav-link']}`} aria-current="page" >Alojamientos</Link>
                  </li>
                        
                  <li className="nav-item  ">
                    <Link to="/reservaciones" className={`nav-link active ${styles['nav-link']}`} aria-current="page" >Reservaciones</Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="/calendario" className={`nav-link active ${styles['nav-link']}`} aria-current="page" >Calendario</Link>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <button className={`btn btn-outline-success  ms-3 ${styles['btn-outline-success']}`} type="button"
                  onClick={cerrar_sesion}> Cerrar Sesión</button>
              
                </form>
             </div>
          </section>
        </nav>

  
  )
}
