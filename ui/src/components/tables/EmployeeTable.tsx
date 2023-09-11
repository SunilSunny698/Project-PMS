import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from '../api/axiosConfig'
import { Employee } from "../types/pmsTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeTableContext = createContext({
  fetchData: async (pageNumber:number, pageSize:number, searchTerm:string, category:string) => {} 
})
export const useFetchDataFunction = () => useContext(EmployeeTableContext)
type EmployeeTableProps = {
  role:"HR" |"Employee"
}
export const EmployeeTable = ({role}:EmployeeTableProps) => {
    const [data,setData] = useState([])
    const [maxPages, setMaxPages] = useState(0)
    const navigate = useNavigate()
    const headers = {          
      Authorization:`Bearer ${localStorage.getItem("X-AUTH")}`
    }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const errorParam = queryParams.get('error');

    const fetchData = async (pageNumber = 0,pageSize = 3, searchTerm: string = '',category: string = '') => {
      let url = `employee/filter?pageNumber=${pageNumber}&pageSize=${pageSize}&search=`;
      if(searchTerm){
        switch(category){
            case "Id":
                url = url + `id=${searchTerm},operation=and`
                break;
            case "Name":
                url = url + `firstName=*${searchTerm}*,lastName=*${searchTerm}*,operation=or`
                break;        
            case "Email":
                url = url + `email=*${searchTerm}*,operation=and`
                break;
            case "Role":
                url = url + `designation=*${searchTerm}*,operation=and`
                break;
            case "All":
                url = url + `firstName=*${searchTerm}*,lastName=*${searchTerm}*,email=*${searchTerm}*,designation=*${searchTerm}*,operation=or`
                break;
            default:
                url = "employee/filter"
        }
      }
      console.log("Url"+url)
      await api.get(url,{headers})
        .then(response => {
          console.log(response.data)
          setMaxPages(response.data.totalPages-1)
          setData(response.data.content)
        })
        .catch(() => {
          toast.warn('Something went wrong', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        })
    }



    useEffect( ()=>{
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 
    

    const deleteHandler = async (row:any) => {
      await api.delete(`employee/${row.id}`,{headers})
        .then(() => {})
        .catch(() => {})
      fetchData(0,3)
    }

    const viewHandler = (row:any) => {
      navigate(`${row.id}`)
    }

    const cols = useMemo<ColumnDef<Employee>[]>(
        () => [
          {
            header:'Id',
            cell: (row) => "ETS00"+row.renderValue(),
            accessorKey:'id'
          },
          {
            header: 'Name',
            cell: (row) => row.renderValue(),
            accessorKey: 'name',
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
      <EmployeeTableContext.Provider value={{fetchData}}>
        <Table fetchHandler={fetchData} maxPages={maxPages} columns={cols} data={data} label="Employee" all={role==="Employee" ? false:true}  deleteHandler={deleteHandler} viewHandler={viewHandler}/>
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
      </EmployeeTableContext.Provider>
    )
    
       
}