export type Employee = {
    id: string,
    name: string,
    email: string,
    designation: string,
}

export type Earning = {
    employeeId: number,
    anyAllowances: number,
    bonus: number,
    name: string
}

export type Deduction = {
    employeeId: number,
    providentFund: number,
    tax: number,
}
export type UserDataTypes = {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    joinDate: string; 
    gender: 'Male' | 'Female' | 'Other'; 
    contactInformation: string;
    role: 'HR' | 'Employee'; 
    basicSalary: number;
    email: string;
    designation: string;
    password: string
}