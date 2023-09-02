import { useState } from 'react'
import Input from '../atoms/Input'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import api from '../api/axiosConfig'
import {yupResolver} from "@hookform/resolvers/yup"
import { AlertBox } from '../alerts/AlertBox'

type AddEarningsFormTypes = {
    employeeId:string,
    anyAllowances: number,
    bonus: number
}
type EarningFormTypes = {
    formType?: "EDIT"
    row?:any
}
const schema = yup.object().shape({
    employeeId: yup.string().required("Employee id is required"),
    anyAllowances: yup.number().typeError("Invalid value").required("Allowances field is required"),
    bonus: yup.number().required("Bonus field is required").typeError("Invalid value")
})
export const EarningForm = ({formType,row}:EarningFormTypes) => {

    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)
    const [message,setMessage] =useState('')
    

    const {register, formState, handleSubmit} = useForm<AddEarningsFormTypes>
    (
        {
            defaultValues:row?row:{},
            resolver: yupResolver(schema)
        }
    )
    const {errors} = formState
    
    const onSubmit = async (data:AddEarningsFormTypes) => {
        const headers = {            
            Authorization:`Bearer ${localStorage.getItem("Jwt")}`
        }
        await api.post("/addempearn",data,{headers})
        .then(() => {
            setSuccess(true)
            setError(false)
            formType?
                setMessage("Updated successfully")
                :
                setMessage("Added successfullt")
        })
        .catch(error => {
            setError(true)
            setSuccess(false)
            setMessage(error.response.data.errorMessage)
        })
    }
    return (
        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
            <AlertBox error={error} success={success} message={message} />
            <Input type='text' label='Employee ID' register={{...register("employeeId")}} error={errors.employeeId?.message} />
            <Input type='number' label='Allowances' register={{...register("anyAllowances")}} error={errors.anyAllowances?.message}/>
            <Input type='number' label = 'Bonus' register={{...register("bonus")}} error={errors.bonus?.message} />
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <input data-modal-hide="defaultModal" type="submit" className="text-white bg-primary hover:bg-ternary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-ternary" />
            </div>
        </form>
    )
}
