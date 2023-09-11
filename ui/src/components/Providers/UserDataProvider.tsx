import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


import { UserDataTypes } from '../types/pmsTypes';


interface UserDataContextTypes {
  userData: UserDataTypes;
  setUserData: React.Dispatch<React.SetStateAction<UserDataTypes>>;
}

const UserDataContext = createContext<UserDataContextTypes | undefined>(undefined);

interface UserDataProviderProps {
  children: ReactNode;
}

export function UserDataProvider( {children}:UserDataProviderProps ) {
  const [userData, setUserData] = useState<UserDataTypes>({} as UserDataTypes);
    useEffect(()=>{
        const storedData = sessionStorage.getItem("user")
        if(storedData){
            const data: UserDataTypes = JSON.parse(storedData)
            setUserData(data)
        }
    },[])
  const contextValue: UserDataContextTypes = {
    userData,
    setUserData,
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData(): UserDataContextTypes {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}
