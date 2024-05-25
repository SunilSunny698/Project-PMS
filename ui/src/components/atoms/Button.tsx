import React from 'react'
type ButtonProps = {
    children: React.ReactNode
    bg: string,
    hover: string,
    others: string
}
export const Button: React.FC<ButtonProps> = ({children,bg,hover,others}) => {
  const style = `text-center bg-${bg} hover:bg-${hover} ${others}`
  
  return (
    <button className={style}>
      {children}
    </button>  
  );
}
