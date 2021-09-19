import { Request,Response } from 'express';
import {IResetTokenUseCase} from '../../Protocols/Token/ResetToken/IResetTokenUseCase'
export class ResetPasswordController{
    constructor(private resetTokenUseCase:IResetTokenUseCase){}
    async handle(req: Request, res: Response):Promise<Response>{
        const {password}=req.body
        const {token}=req.query

        await this.resetTokenUseCase.execute(password,String(token))
        return res.status(201).json({msg:'Password updated successfully'})
    }
}