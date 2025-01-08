import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './Login'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import styles from '../styles/Navegacion.module.css';

export default function () {
  return (
    <div>
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
                  <section className="container-fluid">
                                       
                    <div className={`collapse navbar-collapse `} id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link to="/home" className={`nav-link active ${styles['nav-link']}`} aria-current="page" >Inicio</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/alojamientos" className={`nav-link active ${styles['nav-link']}`} aria-current="page" >Alojamientos</Link>
                        </li>
                        
                        <li className="nav-item">
                        <Link to="/reservaciones" className={`nav-link active ${styles['nav-link']}`} aria-current="page" >Reservaciones</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/calendario" className={`nav-link active ${styles['nav-link']}`} aria-current="page" >Calendario</Link>
                        </li>
                      </ul>
                      <form className="d-flex" role="search">
                        <button class={`btn btn-outline-success ${styles['btn-outline-success']}`} type="button">Cerrar Sesión</button>
                      </form>
                    </div>
                  </section>
        </nav>
  </div>
  )
}
