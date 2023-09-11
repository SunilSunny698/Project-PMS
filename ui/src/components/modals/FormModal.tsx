import React, { useEffect, useState } from 'react'
import { EmployeeForm } from '../forms/EmployeeForm';
import { DeductionForm } from '../forms/DeductionForm';
import { EarningForm } from '../forms/EarningForm';
import { Loading } from '../loading/Loading';
import { useFetchDataFunction } from '../tables/EmployeeTable';
import { toast } from 'react-toastify';
export type category = 'Employee' | 'Earning' | 'Deduction'
type action = 'Add' | 'Edit' | 'Delete'
type FormModalProps = {
    modalType: `${action} ${category}`
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    row?: any
    fetchHandler:(pageNumber:number, pageSize:number, searchTerm: string, category: string)=>void
}
type ModalContentProps = {
    modalType: `${action} ${category}`
    row?: any
}
const ModalContent = ({ modalType, row }: ModalContentProps) => {
    switch (modalType) {
      case 'Add Employee':
        return <EmployeeForm />;
      case 'Edit Employee':
        return <EmployeeForm formType="EDIT" row={row} />;
      case 'Add Deduction':
        return <DeductionForm />;
      case 'Edit Deduction':
        return <DeductionForm formType="EDIT" row={row} />;
      case 'Add Earning':
        return <EarningForm />;
      case 'Edit Earning':
        return <EarningForm formType="EDIT" row={row} />;
      default:
        return null;
    }
};
export const FormModal = ({modalType,toggleModal,row,fetchHandler}:FormModalProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const message = modalType.split("0")[0]==="Edit" ? "Fetching the data please wait": "Loading the form please wait"
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        }, 2000);

        return () => {
        clearTimeout(loadingTimer);
        };
    }, []);
    const OnCloseClickHandler = () => {
        toggleModal(false)
        fetchHandler(0,3,'','')
        toast.success(`${modalType.split(' ')[0]}ed successfully`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    return (
        <>
            {isLoading &&
                <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                    <Loading message={message}/>
                </div>
            }
            {!isLoading &&
            <>
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"></div>
                <div id="defaultModal" className="fixed top-0 left-0 right-0 z-50 w-full p-4 flex items-center justify-center  overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                    
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {modalType}
                                </h3>
                                <button onClick={OnCloseClickHandler} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {<ModalContent modalType={modalType} row={row} />}
                        </div>
                    </div>
                    
                </div>
                        
            </> 
        }
        </>
    )
}
