import { ISendForgotPasswordUseCase } from './../../Protocols/User/EMAIL/ForgotPassword/ISendForgotPasswordUseCase';
import { Request,Response } from 'express';


export class SendForgotPasswordController{
    constructor(private sendForgotPasswordUseCase:ISendForgotPasswordUseCase){}
    async handle(req: Request, res: Response):Promise<Response> {
        const {email}=req.body;

        await this.sendForgotPasswordUseCase.execute(email)
        return res.status(200).json({msg:`Email successfully sent to  ${email}`});
    }
}