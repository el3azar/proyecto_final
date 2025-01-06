import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Accomodations from '../components/accomodations/Accomodations'
import Home from '../components/Home'
import Bookings from '../components/bookings/Bookings'
import UpdateAccomodation from '../components/accomodations/UpdateAccomodation'
import Calendar from '../components/bookings/Calendar'

export default function Rutas() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/alojamientos' element={<Accomodations />}/>
                <Route path='/reservaciones' element={<Bookings/>}/>
                <Route path='/updateAlojamiento' element={<UpdateAccomodation/>}/>
                <Route path='/calendario' element={<Calendar/>}/>
            </Routes>
        </BrowserRouter>
    )
}
