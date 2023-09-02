import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../atoms/Input'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import api from '../api/axiosConfig'
import  {AlertBox}  from '../alerts/AlertBox'
import { UserDataTypes } from '../types/pmsTypes'
type AddEmpFormTypes = {
    id:number,
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: Date,
    gender: string,
    contactInformation: string,
    role: string,
    basicSalary: number,
    joinDate: Date,
    designation: string,
    password: string
}
type EmpFormTypes = {
  formType?: "EDIT"
  row?:any
}
const schema = yup.object().shape({
  id: yup.number().required("Id is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email:yup.string().email("Invalid email format").required("Email is required"),
  dateOfBirth: yup.date().typeError("Must have date of birth").required("Birth date is required"),
  gender: yup.string().required('Gender is required'),
  contactInformation: yup.string().required("Must have a phone number"),
  role: yup.string().required("Must have a role"),
  basicSalary: yup.number().required("Salary is required"),
  joinDate: yup.date().typeError("Join date is required").required("Must have a join date"),
  designation:yup.string().required("Must have a designation"),
  password: yup.string().required("Passoword is required")
})
export const EmpForm = ({formType,row}:EmpFormTypes) => {
  const [error,setError] = useState(false)
  const [success,setSuccess] = useState(false)
  const [message,setMessage] =useState('')

  const  {register,formState,handleSubmit} = useForm<AddEmpFormTypes>(
    {
        defaultValues:formType?convertToAddEmpForm(row):undefined,
        resolver: yupResolver(schema)
    }
  )
  const {errors} = formState
  const onSubmit = async (data:AddEmpFormTypes) => {
    const headers = {            
      Authorization:`Bearer ${localStorage.getItem("Jwt")}`
    }
    if(!formType){
      await api.post("/addemp",data,{headers})
        .then(() => {
          setSuccess(true)
          setError(false)
          setMessage("Added successfully")
        })
        .catch(error => {
          setError(true)
          setSuccess(false)
          setMessage(error.response.data.errorMessage)
        })
      }
    else{
      await api.put("/updatemp",data,{headers})
        .then(() => {
          setSuccess(true)
          setError(false)
          setMessage("Updated successfully")
        })
        .catch(error => {
          setError(true)
          setSuccess(false)
          setMessage(error.response.data.errorMessage)
        })
    }
  }
  return (
    <>
    
    <form onSubmit={handleSubmit(onSubmit)}>
    <AlertBox error={error} success={success} message={message} />
        <div className='px-4 py-4 sm:grid grid-cols-2 gap-5'>
            <Input type='number' label='Employee Id' register={{...register("id")}}  
             error={errors.id?.message} />
            <Input type='text' label='First name'
             register={{...register("firstName")}}  
             error={errors.firstName?.message}/>
            <Input type='text' label='Last name' register={{...register("lastName")}}  error={errors.lastName?.message}/>
            <Input type='email' label='Email' register={{...register("email")}}  error={errors.email?.message}/>
            <Input type='text' label='Password' register={{...register("password")}}  error={errors.password?.message}/>
            <div className='mb-4'>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
              <select id="countries" {...register("gender")} className="bg-gray-50 border pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Choose gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option> 
              </select>
              {errors.gender && <p className='text-red-500 text-xs'>{errors.gender.message}</p>}
            </div>
            <Input type='date' label='Date of Birth' register={{...register("dateOfBirth")}}  error={errors.dateOfBirth?.message}/>
            <Input type='text' label='Phone no' register={{...register("contactInformation")}}  error={errors.contactInformation?.message}/>
            <Input type='number' label='Salary' register={{...register("basicSalary")}}  error={errors.basicSalary?.message}/>
            <Input type='date' label='Joined date' register={{...register("joinDate")}}  error={errors.joinDate?.message}/>
            <div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
              <select id="countries" {...register("role")} className="bg-gray-50 border pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Choose role</option>
                  <option value="Employee">Employee</option>
                  <option value="HR">HR</option>
              </select>
              <span className="text-red-500 text-xs">{errors.role?.message}</span>
            </div>
            <div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                <select id="countries" {...register("designation")} className="bg-gray-50 border pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Choose designation</option>
                    <option value="Developer">Developer</option>
                    <option value="Tester">Tester</option>
                    <option value="Sales">Sales</option>
                    <option value="Product">Product</option>
                </select>
                <span className="text-red-500 text-xs">{errors.designation?.message}</span>
            </div>
        </div>
        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <input data-modal-hide="defaultModal" type="submit" className="text-white bg-primary hover:bg-ternary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-ternary" />
        </div>
    </form>
    </>
  )
}

function convertToAddEmpForm(data: UserDataTypes): AddEmpFormTypes {
  const addEmpFormData: AddEmpFormTypes = {
    id: data.id ,
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    dateOfBirth: new Date(data.dateOfBirth) || new Date().getDate(),
    gender: data.gender || '',
    contactInformation: data.contactInformation || '',
    role: data.role || '',
    basicSalary: Number(data.basicSalary) || 0,
    joinDate: new Date(data.joinDate) || new Date(),
    designation: data.designation || '',
    password: '',
  };

  return addEmpFormData;
}
