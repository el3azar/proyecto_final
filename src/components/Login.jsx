import React from 'react'
import { useForm } from 'react-hook-form'
import { login,getAllUser } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
import styles  from '../styles/Login.module.css';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { FaInfoCircle } from 'react-icons/fa';

   //metodo para obtener el id del usuario
   export const getIdUser = async () => {
    const correo = sessionStorage.getItem('correo_user');
    const response = await getAllUser();
    if(correo){
        const user = response.find((item) => item.email === correo);
          if (user) {
              console.log(user.id);
              return user.id;
          }
      }
  }
  //metodo para obtener el token del usuario
    export const getToken =  () => {
        const session_token = sessionStorage.getItem('token_bookings');
        if(session_token){
            return session_token;
        }else{
            return null;
        }
        
    }

export default function Login() {
    //entrada de datos del formulario
    const { register, handleSubmit } = useForm()
   
   

    const navigate = useNavigate()

    //metodo para validar el usuario
    const loginForm = async (data) => {
        console.log(data); //{email, password}
        const response = await login(data);
        //validando la respuesta del login
        if(response?.token){
            //si esta autorizada, guardamos el token en el sessionstorage
            sessionStorage.setItem('token_bookings', response.token)
            sessionStorage.setItem('correo_user', response.user)
            
        }
        //redireccione al home
        navigate("/home")
        console.log(response);
        
    }


    return (
        <div className='container'> 
            <h1><FaArrowRightToBracket className='me-2'/>Iniciar Sesion</h1>
            <form action="" onSubmit={handleSubmit(loginForm)}>
                
                <div>
                   <p><FaInfoCircle className='me-2'/>Ingresa tus credenciales para acceder al sistema</p>
                </div>
                <div className= {`${styles.alineado} mb-3`} >
                    <label htmlFor="">Correo</label>
                    <input type="email" {...register('email')} className='w-100'/>
                </div>
                <div  className= {`${styles.alineado} mb-3`}>
                    <label htmlFor="">Contraseña</label>
                    <input type="password" {...register('password')} className='w-100'/>
                </div>
                <div className='d-flex justify-content-start '>
                    <button type='submit' className='btn btn-danger w-100'><FaArrowRightToBracket className='me-2' />Iniciar sesion</button>
                </div>
            </form>
        </div>
    )
}

 