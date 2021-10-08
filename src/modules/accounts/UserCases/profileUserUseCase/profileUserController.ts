import { Request, Response } from 'express';
// import { IUser } from '../../Protocols/User/UserProtocol';
import {IProfileUserUseCase} from '../../Protocols/User/IProfileUserUseCase'


export class ProfileUserController{
    constructor(private profileUserUseCase:IProfileUserUseCase){}
    async handle(req:Request,res:Response):Promise<Response>{
        const {id}=req.user
        const profileUser=await this.profileUserUseCase.execute(id)
        return res.status(200).json(profileUser)
    }
}