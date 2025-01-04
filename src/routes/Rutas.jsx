import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Accomodations from '../components/Accomodations'
import Home from '../components/Home'
import Bookings from '../components/Bookings'
import UpdateAccomodation from '../components/UpdateAccomodation'

export default function Rutas() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/alojamientos' element={<Accomodations />}/>
                <Route path='/reservaciones' element={<Bookings/>}/>
                <Route path='/updateAlojamiento' element={<UpdateAccomodation/>}/>
            </Routes>
        </BrowserRouter>
    )
}
