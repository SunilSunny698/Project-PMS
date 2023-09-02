import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import {  useParams } from 'react-router-dom';
import api from '../api/axiosConfig'
import { Loading } from '../loading/Loading';
import { useNavigate } from "react-router-dom";
interface PayslipData {
  totalDeductions: number;
  netSalary: number;
  name: string;
  deductionsId: number;
  designation: string;
  any_allowances: number;
  bonus: number;
  pf: number;
  basicSalary: number;
  employeeid: number;
  tax: number; 
  totalEarnings: number;
}
const Payslip: React.FC = () => {
  const payslipRef = useRef<HTMLDivElement | null>(null);
  const [data,setData] = useState<PayslipData>({} as PayslipData)
  const navigate=useNavigate()
  
  const {id} = useParams()
  const headers = {
    Authorization:`Bearer ${localStorage.getItem("Jwt")}`
  }
  const fetchData = async() => {
    await api.get(`/generateps/${id}`,{headers})
          .then(response => {
            if(response.data.deductionsId == null || response.data.bonus ==null){
              navigate("/hr/employees?error=true")
            }
            else{
              setData(response.data)
            }
          })
          .catch(error => {
            navigate("/hr/employees?error=true")
          })
  }
  useEffect(()=>{
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      fetchData();
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 
  const downloadPdf = async () => {
    if (payslipRef.current) {
      const payslipContainer = payslipRef.current;

      const canvas = await html2canvas(payslipContainer);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('payslip.pdf');
    }
  };
  const [isLoading, setIsLoading] = useState(true);


  return (
    data && 
    
    <>
        {isLoading &&
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <Loading message='Generating pay slip, Please wait'/>
            </div>
        }
        {!isLoading &&
            <>
            <div ref={payslipRef} className="container mt-[100px] sm:mt-[95px] mx-auto mt-5 mb-5 border border-gray-200 shadow rounded px-7 py-4">
                  <div  className=" text-center lh-1 mb-2">
                    <h6 className="font-bold text-2xl mb-1">Test Sigma Payslip</h6>
                    <span className="font-normal text-lg">Payment slip for the month of August 2023</span>
                  </div>
                  <div className="flex justify-end">
                    <i>Working Branch: HR</i>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mr-5">
                  <div className="md:flex md:flex-col border border-gray-200 border-box px-10 py-5">
                    <div className="flex mb-2">
                        <span className="font-black w-32">EMP Id:</span>
                        <span>{data.employeeid}</span>
                        </div>
                        <div className="flex mb-2">
                        <span className="font-black w-32">EMP Name:</span>
                        <span>{data.name}</span>
                        </div>
                        <div className="flex mb-2">
                        <span className="font-black w-32">PF No:</span>
                        <span>{data.deductionsId}</span>
                        </div>
                        <div className="flex mb-2">
                        <span className="font-black w-32">Mode of Pay:</span>
                        <span>HDFC</span>
                        </div>
                        <div className="flex mb-2">
                        <span className="font-black w-32">Designation:</span>
                        <span>{data.designation}</span>
                        </div>
                        <div className="flex mb-2">
                        <span className="font-black w-32">Base Salary:</span>
                        <span>{data.basicSalary}</span>
                        </div>
                    </div>
                    <table className="container w-full lg:w-1/2 text-sm text-left text-gray-900 mr-5">
                      <thead className="text-xs text-gray-900 font-black uppercase bg-gray-200">
                        <tr>
                          <th scope="col" className="px-6 py-3">Earnings</th>
                          <th scope="col"className="px-6 py-3">Amount</th>
                          <th scope="col" className="px-6 py-3">Deductions</th>
                          <th scope="col" className="px-6 py-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='bg-white border-b'>
                          <th scope="row" className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>Alowances</th>
                          <td className='px-6 py-4'>{data.any_allowances}</td>
                          <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>PF</td>
                          <td className='px-6 py-4'> {data.pf}</td>
                        </tr>
                        <tr>
                          <th scope="row" className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>Bonus</th>
                          <td className='px-6 py-4'>{data.bonus}</td>
                          <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>TAX</td>
                          <td className='px-6 py-4'>{data.tax}</td>
                        </tr>
                        <tr className="border-t">
                          <th scope="row" className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>Total Earning</th>
                          <td className='px-6 py-4'>{data.any_allowances + data.bonus}</td>
                          <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>Total Deductions</td>
                          <td className='px-6 py-4'> {data.pf+data.tax}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4 mt-8">
                    <div className="md:col-span-1">
                        <span className="font-bold text-xl">Net Pay: {(data.basicSalary+data.any_allowances+data.bonus)-(data.pf+data.tax)}</span>
                    </div>
                    {/* <div className="border md:col-span-1 p-4">
                        <div className="flex flex-col">
                        <span className="font-semibold">In Words:</span>
                        <span>{numberToWords.toW}</span>
                        </div>
                    </div> */}
                    </div>
                    <div className="flex justify-end mt-6">
                    <div className="flex flex-col">
                        <i className="font-bold text-xl mt-2">K R</i>
                        <span className="font-extrabold mb-5">CEO of Test Sigma</span>
                    </div>
                    </div>
                    
                </div>
                <div className='flex justify-center'>
                    <button onClick={downloadPdf}   className="mt-4 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded">
                        Download PDF
                    </button>
                </div> 
            </>

        }
    </>
  );
};

export default Payslip;



