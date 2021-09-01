import { Request, Response } from "express";
import { IUserAvatarService } from "../../Protocols/User/UserAvatarService";

export class updateAvatarController{
    constructor(private userUpdateAvatarService:IUserAvatarService){}
    async handle(req:Request,res:Response):Promise<Response>{
        // Id pegado através da autenticação
        const {id}=req.user
        const avatar_file=req.file.filename
        await this.userUpdateAvatarService.execute({user_id:id,avatar_file})
        return res.status(201).json({msg:'Avatar created with success'})
    }
}