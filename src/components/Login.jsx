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
        const { 
            register, 
            handleSubmit, 
            formState: { errors } 
        } = useForm();
    
        const navigate = useNavigate();
    
        const loginForm = async (data) => {
            console.log(data); // {email, password}
            const response = await login(data);
            if (response?.token) {
                sessionStorage.setItem('token_bookings', response.token);
                sessionStorage.setItem('correo_user', response.user);
                navigate("/home");
            }
        };
    
        return (
            <div className={`${styles.formWrapper}`}>
                <div className={`${styles.formContainer}`}>
                    <h1><FaArrowRightToBracket className="me-2" /> Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit(loginForm)}>
                        <div>
                            <p><FaInfoCircle className="me-2" /> Ingresa tus credenciales para acceder al sistema </p>
                        </div>
                        <div className={`${styles.alineado} mb-3`}>
                            <label htmlFor="email">Correo</label>
                            <input  type="email"  {...register('email', { 
                                    required: "El correo es obligatorio", 
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Ingresa un correo válido"
                                    } 
                                })}  className={`w-100 ${errors.email ? styles.inputError : ''}`}  />
                            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                        </div>
                        <div className={`${styles.alineado} mb-3`}>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password"  {...register('password', { 
                            required: "La contraseña es obligatoria"})} 
                            className={`w-100 ${errors.password ? styles.inputError : ''}`} />
                            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

                        </div>
                        <div className="d-flex justify-content-start">
                            <button type="submit" className={`${styles.customBtn} w-100`}> <FaArrowRightToBracket className="me-2" />
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    