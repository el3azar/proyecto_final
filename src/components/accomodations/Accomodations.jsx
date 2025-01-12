import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../../services/accomodationServices'
import { IoIosAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import Navegacion from '../Navegacion';
import NewAccomodation from './NewAccomodation';
import styles from '../../styles/accomodation/Accomodation.module.css';
import { useNavigate } from 'react-router-dom';
import UpdateAccomodation from './UpdateAccomodation';
import { FaSpinner } from 'react-icons/fa';

export default function Accomodations() {
    const [accomodations, setAccomodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //estado para mostrar el modal
    const [showModal, setShowModal] = useState(false);
    //estado para la carga de datos
    const [loading, setLoading] = useState(true)
    //estado para mostrar el modal de editar alojamiento
      const [showModalUpdate, setShowModalUpdate] = useState(false);
    // Estado  para el alojamiento seleccionado
    const [selectedAccomodation, setSelectedAccomodation] = useState(null);


    const navigate = useNavigate()

    //metodo para obtener la respuesta de la api
    const fetchData = async (session_token) => {
        try{
            const response = await getAccomodations(session_token) //si esto es un exito devolvera un arreglo de alojamientos
            setAccomodations(response);
        }catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
       
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

//metodos para abrir y cerrar el modal de nuevo alojamiento
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
//metodos para abrir y cerrar el modal de editar alojamiento
const handleShowModalUpdate = (item) => {
    setSelectedAccomodation(item); // Asigna el item seleccionado al estado
    setShowModalUpdate(true);
    console.log(item);
    
};

const handleCloseModalUpdate = () => {
    
    setShowModalUpdate(false)
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
                    <header><Navegacion/></header>
                        {/** Parte de carga de datos */}
                        {
                            loading && (
                              <div className="text-center mt-4">
                                <p>Cargando datos, por favor espera...</p>
                                <FaSpinner className="spinner" />
                              </div>
                            )
                        }
                        {!loading && (
                            <>
                                <section className='d-flex justify-content-between'>
                                    <h1>Lista de Alojamientos</h1>
                                </section>
                                <section className={`${styles.aline} `}>
                                    <button className={`${styles.customBtn} `} onClick={() => handleShowModal()}><IoIosAddCircle />Nuevo Alojamiento</button>
                                </section>
                                <section className='container '>
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
                                                                <td> <button className={`${styles.edit_btn} `}  onClick={() => handleShowModalUpdate(item)}><MdModeEdit /></button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    
                                    </div>
                                </section>
                                <NewAccomodation showModal={showModal} handleCloseModal={handleCloseModal}  />
                                <UpdateAccomodation showModalUpdate={showModalUpdate} handleCloseModalUpdate={handleCloseModalUpdate} selectedAccomodation={selectedAccomodation} />

                            </>
                        )}       
                        
                       
                    </>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }
        </div>
    )
}
