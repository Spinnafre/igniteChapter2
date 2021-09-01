import { IUser } from './UserProtocol';

export interface IUserRepository{
    create(data:IUser):Promise<void>,
    findByEmail(email:string):Promise<IUser>,
    findById(id:string):Promise<IUser>
}