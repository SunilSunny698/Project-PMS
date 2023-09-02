import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import api from '../api/axiosConfig'
import { useEffect, useMemo, useState } from "react";

import { Earning } from "../types/pmsTypes";

export const EarningsTable = () => {
    const [data,setData] = useState<Earning[]>([])
    const headers = {          
      Authorization:`Bearer ${localStorage.getItem("Jwt")}`
    }
    const fetchData = async () => {
      await api.get("allearn",{headers})
      .then(response => {
        const Data:Earning[] = response.data
        setData(Data)
        
      })
      .catch(() =>{})
    }
    useEffect(()=>{
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const cols = useMemo<ColumnDef<Earning>[]>(
        () => [
          {
            header:'Id',
            cell: (row) => row.renderValue(),
            accessorKey:'employeeId'
          },
          {
            header: 'Name',
            cell: (row) => row.renderValue(),
            accessorKey: 'name',
          },
          {
            header: 'Allowances',
            cell: (row) => row.renderValue(),
            accessorKey: 'anyAllowances',
          },
          {
            header: 'Bonus',
            cell: (row) => row.renderValue(),
            accessorKey: 'bonus',
          }
          
        ],
        []
       );
    
    return (
        <Table columns={cols} data={data} label="Earning" view={false} del={false} fetchHandler={fetchData}/>
    )
    
       
}