export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    age:number;
    gender: string;
    address: string;
}