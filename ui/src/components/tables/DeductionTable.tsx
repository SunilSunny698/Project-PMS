import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import api from '../api/axiosConfig'
import { useEffect, useMemo, useState } from "react";

import { Deduction } from "../types/pmsTypes";
export const DeductionTable = () => {
    const [data,setData] = useState<Deduction[]>([])
    const headers = {          
      Authorization:`Bearer ${localStorage.getItem("Jwt")}`
    }
    const fetchData = async () => {
      await api.get("allded",{headers})
      .then(response => {
        const Data:Deduction[] = response.data
        setData(Data)
        
      })
      .catch(() => {
      })
    }
    useEffect(  ()=>{
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const cols = useMemo<ColumnDef<Deduction>[]>(
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
            header: 'PF',
            cell: (row) => row.renderValue(),
            accessorKey: 'pf',
          },
          {
            header: 'TAX',
            cell: (row) => row.renderValue(),
            accessorKey: 'tax',
          }
          
        ],
        []
       );
    return (
        <Table  columns={cols} data={data} label="Deduction" view={false} del={false} fetchHandler={fetchData}/>
    )
    
       
}