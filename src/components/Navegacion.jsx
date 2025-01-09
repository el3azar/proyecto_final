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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <section className="container-fluid">
                    
                   
                    <div className="collapse navbar-collapse bg-secondary" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                          <Link to="/home" className="nav-link active" aria-current="page" >Inicio</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/alojamientos" className="nav-link active" aria-current="page" >Alojamientos</Link>
                        </li>
                        
                        <li className="nav-item">
                        <Link to="/reservaciones" className="nav-link active" aria-current="page" >Reservaciones</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/calendario" className="nav-link active" aria-current="page" >Calendario</Link>
                        </li>
                      </ul>
                      <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                      </form>
                    </div>
                  </section>
        </nav>
  </div>
  )
}
