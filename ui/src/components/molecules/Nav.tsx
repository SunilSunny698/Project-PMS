import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Button } from '../atoms/Button';
import { NavItem } from '../atoms/NavItem';
import { useUserData } from '../Providers/UserDataProvider';
import { NavLink } from 'react-router-dom';



const Nav:React.FC = () => {
  const {userData} = useUserData()
  let Links = 
    userData.role === 'HR' ?
      [
        {name:"Dashboard",to:"/hr"},
        {name:"Employees",to:"/hr/employees"},
        {name:"Earnings",to:"/hr/earnings"},
        {name:"Deductions",to:"/hr/deductions"},
        
      ]:
      [ 
        {name:"Dashboard",to:"/employee"},
        {name:"Employees",to:"/employee/employees"},
        {name: "Payslip",to:`/employee/employees/${userData && userData.id}`},
        
      ];
  const logoutURL = userData.role === 'HR' ? "/hr/logout" : "/employee/logout"
  let [open,setOpen]=useState(false);
  return (
    userData && <>
    <div className='shadow-md w-full fixed top-0 left-0 z-30 bg-white' >
      <div className='md:flex items-center justify-between py-5  md:px-10 px-7 '>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-sans 
      text-gray-800'>
        
        <img src={logo} height='40' width='40' alt='PMS'/>
        <p className='text-secondary px-1 pb-1'>Test-$igma

        </p>
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      {
        open? 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>: 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

      }
       

      </div>

      <ul className={`md:flex md:items-center md:pb-0 bg-white pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link,index)=>(
            <NavItem key={index} link={link} onClick={()=>setOpen(!open)} />
          ))
        }
        <NavLink to={logoutURL}>
        <Button bg='primary' hover='ternary' others='duration-300 text-white px-3 py-1  rounded md:ml-8 md:my-0'>
          Logout
        </Button>
        </NavLink>
      </ul>
      
      </div>
    </div>
    <div className='mb-2'>  
     </div>
    </>
  )
}

export default Nav