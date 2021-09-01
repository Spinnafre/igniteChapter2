import { IUser } from './UserProtocol';
import { IUserAuthProtocol } from "./UserAuthProtocol";

interface IRequest{
    email:string,
    password:string
}

export interface IUserAuthService{
    execute({email,password}:IRequest):Promise<IUserAuthProtocol>
}