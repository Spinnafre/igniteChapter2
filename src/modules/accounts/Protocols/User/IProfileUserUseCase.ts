import { IUser } from "./UserProtocol";

export interface IProfileUserUseCase{
    execute(id:string):Promise<IUser>
}