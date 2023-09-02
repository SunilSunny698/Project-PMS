
import { Route, Routes } from 'react-router-dom'
import { Profile } from './pages/Profile'
import { EmpTable } from './tables/EmpTable'
import Nav from './molecules/Nav'
import { Footer } from './molecules/Footer'
import Payslip from './pages/Payslip'
import { Logout } from './pages/Logout'

export const EmpDashBoard = () => {
  return (
    <>
    <Nav/>
    <Routes>
        <Route index element={<Profile />} />
        <Route path='/employees' element={<EmpTable role='E'/>} />
        <Route path='/employees/:id' element={<Payslip />} /> 
        <Route path='/logout' element={<Logout />} />
    </Routes>
    <Footer/>
    </>
  )
}
