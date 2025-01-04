import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../services/accomodationServices'
import { IoIosAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom'
import Navegacion from './Navegacion';
import NewAccomodation from './NewAccomodation';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import UpdateAccomodation from './UpdateAccomodation';
import { useNavigate } from 'react-router-dom';

export default function Accomodations() {
    const [accomodations, setAccomodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //estado para mostrar el modal
      const [showModal, setShowModal] = useState(false);
    //estado para controlar el editar alojamiento
    const [EditAlojamiento, setEditAlojamiento] = useState(false); 
    
    //estado para controlar el alojamiento seleccionado
    const [selectedItem, setSelectedItem] = useState(null); 

    const navigate = useNavigate()

    //metodo para obtener la respuesta de la api
    const fetchData = async () => {
        const response = await getAccomodations() //si esto es un exito devolvera un arreglo de alojamientos
        setAccomodations(response);
    }

    useEffect(() => {
        //validamos si el token existe
        const session_token = sessionStorage.getItem('token_bookings');
        if(session_token){
            setIsAuthenticated(true)
            //va poder visualizar los alojamientos
            fetchData()
        }else{
            setIsAuthenticated(false)
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
    setSelectedItem(item);
    setEditAlojamiento(true);
    
};
const handleCloseEditAlojamiento = () => setEditAlojamiento(false);

    return (
        <div>
            {/** validamos si la persona esta autenticada */}
            {
                isAuthenticated ? (
                    <>
                    <Navegacion/>
                        <section className='d-flex justify-content-between'>
                        <h1>Lista de Alojamientos</h1>
                        <button onClick={() => handleShowModal()}><IoIosAddCircle />Nuevo Alojamiento</button>
                        </section>
                       
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
                                                    <td> <button className="btn btn-danger" onClick={() => handleEditAlojamiento(item)}><MdModeEdit /></button></td>
                                                </tr>
                                            )
                                        })
                                     }
                                </tbody>
                            </table>
                            
                        </div>
                        <NewAccomodation showModal={showModal} handleCloseModal={handleCloseModal}  />

                        {selectedItem && (
                        <UpdateAccomodation showEdit={EditAlojamiento} handleCloseEditAlojamiento={handleCloseEditAlojamiento} item={selectedItem} />
                    )}
                    </>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }
        </div>
    )
}
