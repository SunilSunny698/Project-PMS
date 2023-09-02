import { useForm } from 'react-hook-form'
import Input from '../atoms/Input'
import logo from '../../assets/images/logo.png'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../api/axiosConfig'
import { useState } from 'react'
import { useUserData } from '../Providers/UserDataProvider'
import { useNavigate } from 'react-router-dom'
import { UserDataTypes } from '../types/pmsTypes'


type LoginTypes = {
    email: string,
    password: string
}

const schema = yup.object().shape({
    email:yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
})

export const Login = () => {
    
    const navigate = useNavigate()
    
    const {register, formState, handleSubmit} = useForm<LoginTypes>(
        {
            resolver: yupResolver(schema)
        }
    )
    const [error,setError] = useState(false)
    const {errors} = formState
    const {setUserData}=useUserData()

    const onSubmit = async (data: LoginTypes) => {          
        await api.post("/login",JSON.stringify(data))
            .then(response=>{
                localStorage.setItem("Jwt",response.data.jwt)
                setError(false)
            })
            .catch((error) => {
                setError(true)
        })

        if(!error){
            const headers = {
                Authorization:`Bearer ${localStorage.getItem("Jwt")}`
            }
            await api.get("/profile",{headers})
                .then(response => {
                    const responseData: UserDataTypes = response.data
                    responseData.dateOfBirth = responseData.dateOfBirth.split('T')[0]
                    responseData.joinDate = responseData.joinDate.split('T')[0]
                    setUserData(responseData)
                    sessionStorage.setItem("user",JSON.stringify(responseData))
                    if(response.data.role==='Employee'){
                        navigate("/emp")
                    }
                    else{
                        navigate("/hr")
                    }
                    
                })
                .catch(error => {
                    console.log(error.response)
                })
        }
    }
    return (
    <section className="bg-white-500 dark:bg-white-900">
        <div className="flex flex-col items-center justify-center px-6 py-1 mx-auto md:h-screen lg:py-1">
            <div  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className='rounded-lg' src={logo} alt="PMS" height="120" width="120"/>   
            </div>
            <div className="w-full bg-gray rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="flex items-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Invalid Credentials</span> 
                            </div>
                        </div>}
                        <Input
                         type='email' 
                         label='Email' 
                         placeholder='Enter email' 
                        
                         register={{...register("email")}}
                         error={errors.email?.message}/>
                        <Input 
                            type='password' 
                            label='Password' 
                            placeholder='Enter password' 
                            register={{...register("password")}}
                            error={errors.password?.message}
                         />
                         
                        <button type="submit" className="w-full text-white bg-primary hover:bg-ternary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    </form>
                    
                </div>
            </div>
        </div>
    </section>

    )
}
