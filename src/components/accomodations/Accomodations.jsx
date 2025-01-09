import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../../services/accomodationServices'
import { IoIosAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import Navegacion from '../Navegacion';
import NewAccomodation from './NewAccomodation';
import styles from '../../styles/accomodation/Accomodation.module.css';

import { useNavigate } from 'react-router-dom';

export default function Accomodations() {
    const [accomodations, setAccomodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //estado para mostrar el modal
      const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    //metodo para obtener la respuesta de la api
    const fetchData = async (session_token) => {
        const response = await getAccomodations(session_token) //si esto es un exito devolvera un arreglo de alojamientos
        setAccomodations(response);
    }

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
};

//funciones para edicion
const handleEditAlojamiento = (item) => {
   
    if (item) {
        // Navegación al componente asignado en la ruta
        navigate(`/updateAlojamiento`, { state: { item } });
    }
    
    
    
};


    return (
        <div>
            {/** validamos si la persona esta autenticada */}
            {
                isAuthenticated ? (
                    <>
                    <Navegacion/>
                        <section className='d-flex justify-content-between'>
                            <h1>Lista de Alojamientos</h1>
                        </section>
                        <div className={`${styles.aline} `}>
                            <button className={`${styles.customBtn} `} onClick={() => handleShowModal()}><IoIosAddCircle />Nuevo Alojamiento</button>
                        </div>

                        <div className='container '>
                            <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Imagen</th>
                                        <th>Direccion</th>
                                        <th>Descripcion</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        //mapeando los alojamientos
                                        accomodations.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td >{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td><img src={item.image} alt={item.name} style={{ width: '75%' }} /></td>
                                                    <td>{item.address}</td>
                                                    <td>{item.description}</td>
                                                    <td> <button className={`${styles.edit_btn} `}  onClick={() => handleEditAlojamiento(item)}><MdModeEdit /></button></td>
                                                </tr>
                                            )
                                        })
                                     }
                                </tbody>
                            </table>
                            
                        </div>
                        </div>


                        
                        
                        <NewAccomodation showModal={showModal} handleCloseModal={handleCloseModal}  />

                       
                    </>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }
        </div>
    )
}
