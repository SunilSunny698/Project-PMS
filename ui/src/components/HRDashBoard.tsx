import { Route, Routes } from 'react-router-dom'
import { Profile } from './pages/Profile'
import { EmpTable } from './tables/EmpTable'
import { EarningsTable } from './tables/EarningsTable'
import Nav from './molecules/Nav'
import { Footer } from './molecules/Footer'
import { DeductionTable } from './tables/DeductionTable'

import Payslip from './pages/Payslip'
import { Logout } from './pages/Logout'

export const HRDashBoard = () => {
  return (
    <>
    <Nav/>
    <Routes>
        <Route index element={<Profile />}/>
        <Route path='/employees' element={<EmpTable role='H'/>}/>
        <Route path='/employees/:id' element={<Payslip />} />
        <Route path='/earnings' element={<EarningsTable />}/>
        <Route path='/deductions' element={<DeductionTable />} />
        <Route path='/logout' element={<Logout />} />
    </Routes>
    <Footer/>
    </>
  )
}
