import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import api from '../api/axiosConfig'
import { useEffect, useMemo, useState } from "react";

import { Deduction } from "../types/pmsTypes";
export const DeductionTable = () => {
    const [data,setData] = useState<Deduction[]>([])
    const [maxPages, setMaxPages] = useState(0)
    const headers = {          
      Authorization:`Bearer ${localStorage.getItem("X-AUTH")}`
    }
    const fetchData = async (pageNumber = 0,pageSize = 1) => {
      await api.get(`deduction?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers})
      .then(response => {
        console.log("Ded"+JSON.stringify(response.data))
        setMaxPages(response.data.totalPages-1)
        setData(response.data.content)
        
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
            accessorKey:'id'
          },
          {
            header: 'Name',
            cell: (row) => row.renderValue(),
            accessorKey: 'name',
          },
          {
            header: 'PF',
            cell: (row) => row.renderValue() || 'N/A',
            accessorKey: 'deduction.providentFund',
          },
          {
            header: 'TAX',
            cell: (row) => row.renderValue() || 'N/A',
            accessorKey: 'deduction.tax',
          }
          
        ],
        []
       );
    return (
        <Table maxPages={maxPages}  columns={cols} data={data} label="Deduction" view={false} del={false} fetchHandler={fetchData}/>
    )
    
       
}