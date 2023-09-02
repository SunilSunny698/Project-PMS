import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import { useEffect, useMemo, useState } from "react";
import api from '../api/axiosConfig'
import { Emp } from "../types/pmsTypes";
import { useLocation, useNavigate } from "react-router-dom";
type EmpTableProps = {
  role:"H" |"E"
}
export const EmpTable = ({role}:EmpTableProps) => {
    const [data,setData] = useState<Emp[]>([])
    const navigate = useNavigate()
    const headers = {          
      Authorization:`Bearer ${localStorage.getItem("Jwt")}`
    }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const errorParam = queryParams.get('error');

    const fetchData = async () => {
      await api.get("all",{headers})
      .then(response => {
        const Data:Emp[] = response.data
        setData(Data)
      })
      .catch(() => {})
    }

    useEffect( ()=>{
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 
    

    const deleteHandler = async (row:any) => {
      await api.delete(`deletemp/${row.id}`,{headers})
        .then(() => {})
        .catch(() => {})
      fetchData()
    }

    const viewHandler = (row:any) => {
      navigate(`${row.id}`)
    }

    const cols = useMemo<ColumnDef<Emp>[]>(
        () => [
          {
            header:'Id',
            cell: (row) => row.renderValue(),
            accessorKey:'id'
          },
          {
            header: 'Name',
            cell: (row) => row.renderValue(),
            accessorKey: 'firstName',
          },
          {
            header: 'Email',
            cell: (row) => row.renderValue(),
            accessorKey: 'email',
          },
          {
           header: 'Role',
           cell: (row) => row.renderValue(),
           accessorKey: 'designation',
         },
        ],
        []
       );
       
    return (
      <>
      
        <Table fetchHandler={fetchData} columns={cols} data={data} label="Employee" all={role==="E" ? false:true}  deleteHandler={deleteHandler} viewHandler={viewHandler}/>
        {errorParam && 
        <div className="flex justify-center">
          <div
          className="mb-3 inline-flex w-1/2 items-center rounded-lg bg-red-100 px-6 py-3 -mt-7 text-base text-red-700"
          role="alert">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5">
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clip-rule="evenodd" />
            </svg>
          </span>
          Not enought details to generate payslip
        </div>
        </div>
      }
      </>
    )
    
       
}