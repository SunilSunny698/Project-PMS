import { NavLink } from "react-router-dom"
import  { MouseEvent } from 'react';
type NavItemProps = {
    link: {
        name: string,
        to: string
    }
    onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}

export const NavItem = ({link,onClick}:NavItemProps) => {
  return (
    <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
           <NavLink to={link.to} onClick={onClick} className='text-gray-800 hover:text-primary duration-400'>{link.name}</NavLink>
    </li>
  )
}
