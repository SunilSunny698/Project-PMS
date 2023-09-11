
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';




interface InputProps extends React.HTMLProps<HTMLInputElement> {
  type: string,
  label: string;
  error?: string
  register: UseFormRegisterReturn;
  inclass?: string,
  labclass?: string
  
}

const Input: React.FC<InputProps> = ({ type,label, error,register,inclass,labclass, ...inputProps }) => {
    const fixInclass ="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const fixlabclass ="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    if(type==="radio"){
        console.log(label)
        return (
            <div className="flex items-center mr-4">
                <input type={type} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  {...register} {...inputProps}/>
                <label htmlFor={label} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            </div>
        )
    }
  return (
    
    <div className="mb-4">
        <label htmlFor={label} className={fixlabclass}>{label}</label>
        <input type={type} className={fixInclass}  {...register} {...inputProps}/>
        {error && <span className="text-red-500 text-xs">{error}</span> }
    </div>
    
  );
};

export default Input;