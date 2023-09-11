
import { Route, Routes } from 'react-router-dom'
import { Profile } from './pages/Profile'
import { EmployeeTable } from './tables/EmployeeTable'
import Nav from './molecules/Nav'
import { Footer } from './molecules/Footer'
import Payslip from './pages/Payslip'
import { Logout } from './pages/Logout'

export const EmployeeDashBoard = () => {
  return (
    <>
    <Nav/>
    <Routes>
        <Route index element={<Profile />} />
        <Route path='/employees' element={<EmployeeTable role='Employee'/>} />
        <Route path='/employees/:id' element={<Payslip />} /> 
        <Route path='/logout' element={<Logout />} />
    </Routes>
    <Footer/>
    </>
  )
}
