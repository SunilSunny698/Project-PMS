import { useUserData } from '../Providers/UserDataProvider'
export const Profile = () => {
    const {userData} = useUserData()
    console.log(userData && userData);
    return (
        userData && (
        <div className="container mx-auto mt-[100px] sm:mt-[170px] p-5 sm:pb-[20px] pb-[100px]">
            <div className="md:flex no-wrap md:-mx-2 ">
                
                <div className="w-full md:w-3/12 md:mx-2">
                    
                    <div className="bg-white p-3 border-t-4 border-green-400">
                        <div className="inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-gray-600 dark:text-gray-300">{userData?.firstName?.charAt(0)}</span>
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{`${userData?.firstName} ${userData?.lastName}`}</h1>
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">{userData?.designation}</h3>
                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                        Welcome to the Testsigma Payroll Management System!

                        At Testsigma, we take pride in providing a seamless and efficient payroll experience for our employees.

                    


                        </p>
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto"><span
                                        className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Member since</span>
                                <span className="ml-auto">{(userData?.joinDate)}</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="my-4"></div>
                    
                    
                    
                </div>
                
                <div className="w-full md:w-9/12 mx-2 h-64 mb-5">
                    
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span className="text-green-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Employee Id</div>
                                    <div className="px-4 py-2">{userData?.id}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email</div>
                                    <div className="px-4 py-2">
                                        <a className="text-blue-800" href={`${userData?.email}`}>{userData?.email}</a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    <div className="px-4 py-2">{userData?.firstName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                    <div className="px-4 py-2">{userData?.lastName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Gender</div>
                                    <div className="px-4 py-2">{userData?.gender}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    <div className="px-4 py-2">{userData?.contactInformation}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Salary</div>
                                    <div className="px-4 py-2">{userData?.basicSalary}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Birthday</div>
                                    <div className="px-4 py-2">{userData && (userData?.dateOfBirth)}</div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        )   
    )
}



