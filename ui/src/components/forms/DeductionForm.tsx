import { useState } from 'react'
import Input from '../atoms/Input'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import api from '../api/axiosConfig'
import { AlertBox } from '../alerts/AlertBox'

type AddDeductionFormTypes = {
    employeeId:string,
    providentFund: number,
    tax: number
}
type DeductionFormTypes = {
    formType?: "EDIT"
    row?:any
}

const schema = yup.object().shape({
    employeeId: yup.string().required("Employee id is required"),
    providentFund: yup.number().required("Pf field is required").typeError("Invalid value"),
    tax: yup.number().required("Tax field is required").typeError("Invalid value"),
})


export const DeductionForm = ({formType,row}:DeductionFormTypes) => {
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)
    const [message,setMessage] =useState('')

    
    const {register, formState, handleSubmit} = useForm<AddDeductionFormTypes>
    (
        {
            defaultValues: row && 
            {
                employeeId:row.id,
                providentFund: row.deduction ? row.deduction.providentFund : null,
                tax: row.deduction ? row.deduction.tax : null
            },
            resolver: yupResolver(schema)
        }
    )
    const {errors} = formState
    const onSubmit = async (data:AddDeductionFormTypes) => {
        console.log(data)
        const headers = {            
            Authorization:`Bearer ${localStorage.getItem("X-AUTH")}`
        }
        const body = row ? 
                    {...data,
                        id:row.deduction && row.deduction.id
                    } 
                    : data 
        await api.post("/deduction",body,{headers})
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
            console.log(error.response)
        })
    }
  return (
    <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
        <AlertBox error={error} success={success} message={message} />
        <Input type='text' label='Employee ID' register={{...register("employeeId")}} error={errors.employeeId?.message} />
        <Input type='number' label='PF' register={{...register("providentFund")}} error={errors.providentFund?.message}/>
        <Input type='number' label = 'TAX' register={{...register("tax")}} error={errors.tax?.message} />
        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <input data-modal-hide="defaultModal" type="submit" className="text-white bg-primary hover:bg-ternary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-ternary" />
        </div>
    </form>
  )
}
