import { getCoreRowModel, useReactTable, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { FormModal } from '../modals/FormModal';
import { category } from '../modals/FormModal';
import { useEffect, useState } from 'react';
import { Loading } from '../loading/Loading';
import { FilterForm } from '../filter/FilterForm';
import { useFetchDataFunction } from './EmployeeTable';
import NoData from '../errors/NoData';


interface ReactTableProps<T extends object> {
    data: T[],
    columns: ColumnDef<T>[],
    label: `${category}`
    view?:boolean,
    edit?:boolean,
    del?:boolean,
    all?:boolean,
    maxPages?:number
    deleteHandler?: (row:any)=>void
    viewHandler?: (row:any)=>void
    fetchHandler: (pageNumber: number,pageSize: number,searchTerm: string, category?: string)=>void
}

export const Table = <T extends object>({fetchHandler, maxPages,data, columns, label, view=true, edit=true, del=true, all=true, deleteHandler, viewHandler}: ReactTableProps<T>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [row, setRow] = useState<any>(null)
    const [pageSize,setPageSize] = useState(3)
    const [pageNumber, setPageNumber] = useState(0)
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    console.log("Page size: "+pageSize)
    console.log("Page number: "+pageNumber)
    console.log(data)
    const table = useReactTable(
        {
            columns,
            data,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
        }
    );
    const [showAddModal,setShowAddModal] = useState(false)
    const [showEditModal,setShowEditModal] = useState(false)
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    useEffect(()=>{
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => {
            clearTimeout(loadingTimer);
        };
    },[isLoading]) 


    return (
        

        <>
            {isLoading ?
                    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                        <Loading message={`Fetching ${label}s information, Please wait`}/>
                    </div> 
            
            :
            <>

            <div className='mt-10'></div>
            
            <div className="container mb-20 mt-[100px]  mx-auto px-2 sm:px-8 pt-">
                {showAddModal && <FormModal modalType={`Add ${label}`} toggleModal={setShowAddModal} fetchHandler={fetchHandler}/>}
                {showEditModal && <FormModal modalType={`Edit ${label}`} toggleModal={setShowEditModal} row={row} fetchHandler={fetchHandler}/>}
                
                {showDeleteModal &&
                <>
                
                

                <div id="popup-modal" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-y-auto flex items-center justify-center  md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="popup-modal"
                            onClick={()=>setShowDeleteModal(false)}
                            >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                            <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete?
                            </h3>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                onClick={()=>{
                                    if(label==="Employee"){
                                        deleteHandler && deleteHandler(row);
                                    }
                                    setShowDeleteModal(false)}}
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={()=>setShowDeleteModal(false)} 
                            >
                                No, cancel
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </>
                }
                
                <div className="py-8">
                <div className="my-2 py-3">
                    <div className='flex '>
                        <div className='text-secondary mt-1 mb-1 sm:pr-8  text-3xl font-bold'>
                            {label} Information
                        </div>
                        <div>
                            <button onClick={()=>setShowAddModal(true)} type="button" className="ml-2 sm:-ml-7 mt-2  rounded-full text-sm font-medium text-center inline-flex items-center text-white  bg-white text-black hover:text-white border-secondary focus:ring-4 focus:outline-none focus:ring-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary hover:text-secondary">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"  clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        
                    </div>
                    {label=="Employee" &&
                        <FilterForm 
                            searchTerm={searchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            setSearchTerm={setSearchTerm}
                            fetchHandler={fetchHandler}
                            pageNumber={pageNumber}
                            pageSize={pageSize}
                        />
                    }
                    
                    </div>
                    
                    <div className="flex jusify-center overflow-x-auto">
                    <div className="mx-auto inline-block rounded overflow-hidden sm:w-full md:w-full">
                        <table className="w-full leading-normal " >
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className='bg-primary'>
                                    {headerGroup.headers.map((header)=>(
                                        <th key={header.id} className='px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-white uppercase tracking-wider'>
                                            {header.isPlaceholder ? null: flexRender(header.column.columnDef.header,header.getContext())}
                                        </th>
                                    ))}
                                    {
                                        all && <th className="px-2 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                                    }
                                    
                                </tr>
                            ))}
                        </thead>
                        {data.length!=0 &&
                        (<tbody>
                            {
                                table.getRowModel().rows.map((row)=>(
                                    <tr key={row.id} className='hover:bg-gray-200 cursor-pointer '>
                                        {
                                            row.getVisibleCells().map((cell)=>(
                                                <td key={cell.id} className="px-2 py-2 w-auto border-b border-gray-200 text-sm">
                                                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                                </td>
                                            ))
                                        }
                                        {
                                            all &&
                                            <td className="px-2 py-3  border-b border-gray-200 text-sm">
                                                <div className="flex">
                                                    {view && <div onClick={
                                                        ()=>{
                                                            viewHandler && viewHandler(row.original)
                                                        }} className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-150">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </div>}
                                                    {edit && <div onClick={()=>{setRow(row.original);setShowEditModal(true)}} className="w-4 mr-2 transform hover:text-blue-600 hover:scale-150">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </div>}
                                                    {del && <div onClick={()=>{setShowDeleteModal(true);setRow(row.original)}} className="w-4 mr-2 transform hover:text-red-500 hover:scale-150">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </div>}
                                                </div>
                                            </td>
                                        }       
                                    </tr>
                                ))
                            }
                        </tbody>)}
                        </table>
                        {
                            data.length == 0 && 
                            <>
                                <NoData/>
                            </>
                        }
                    </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            setPageNumber((prevPageNumber) => prevPageNumber - 1);
                            fetchHandler(pageNumber-1,pageSize,searchTerm,selectedCategory)
                            }
                        }
                        disabled={pageNumber === 0 || data.length == 0}
                        className="flex items-center cursor-pointer disabled:bg-gray-500 justify-center px-3 h-8 text-sm font-medium text-white bg-primary border rounded-lg hover:bg-ternary w-[90px]">
                        Previous
                    </button>
                    <button 
                    onClick={() => {
                        setPageNumber((prevPageNumber) => prevPageNumber + 1);
                        fetchHandler(pageNumber+1,pageSize,searchTerm,selectedCategory)
                        }
                    }
                    disabled={pageNumber === maxPages || data.length==0}
                        className="flex items-center cursor-pointer disabled:bg-gray-500 justify-center px-3 h-8 ml-3 text-sm font-medium text-white bg-primary border  rounded-lg hover:bg-ternary w-[90px]">
                        Next
                    </button>
                    <div className=' ml-3'>
                        
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPageNumber(0)
                                fetchHandler(pageNumber,Number(e.target.value),searchTerm,selectedCategory)
                                console.log("At table:"+pageNumber,pageSize)
                            }}
                            id="countries" className="p-0 pl-3  box-border select-xs border border-gray-400 h-8 rounded-lg text-black text-sm  block w-[65px] "
                        >
                            {[1,2,3,4,5].map((pageSize) => (
                                <option key={pageSize} value={pageSize} selected={pageSize === 5}>
                                {pageSize}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
            </div>
            </>
            }
        </>
    )
}




