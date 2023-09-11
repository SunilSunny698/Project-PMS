import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";
import api from '../api/axiosConfig'
import { useEffect, useMemo, useState } from "react";

import { Earning } from "../types/pmsTypes";

export const EarningsTable = () => {
    const [data,setData] = useState<Earning[]>([])
    const [maxPages, setMaxPages] = useState(0)
    const headers = {          
      Authorization:`Bearer ${localStorage.getItem("X-AUTH")}`
    }
    const fetchData = async (pageNumber = 0,pageSize = 1) => {
      await api.get(`earning?pageNumber=${pageNumber}&pageSize=${pageSize}`,{headers})
      .then(response => {
        const Data:Earning[] = response.data.content
        setMaxPages(response.data.totalPages-1)
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
            accessorKey:'id'
          },
          {
            header: 'Name',
            cell: (row) => row.renderValue(),
            accessorKey: 'name',
          },
          {
            header: 'Allowances',
            cell: (row) => row.renderValue() || 'N/A',
            accessorKey: 'earning.anyAllowances',
          },
          {
            header: 'Bonus',
            cell: (row) => row.renderValue() || 'N/A',
            accessorKey: 'earning.bonus',
          }
          
        ],
        []
       );
    
    return (
        <Table maxPages={maxPages} columns={cols} data={data} label="Earning" view={false} del={false} fetchHandler={fetchData}/>
    )
    
       
}