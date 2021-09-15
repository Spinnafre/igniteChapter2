import { Request, Response } from 'express';
import { CreateDevolutionUseCase } from "./createDevolutionUseCase";

class CreateDevolutionController{
    constructor(private createDevolutionUseCase:CreateDevolutionUseCase){}
    async handle(req:Request,res: Response):Promise<Response>{
        const {id:user_id}=req.user 
        const {id:rental_id}=req.params

        const devolution=await this.createDevolutionUseCase.create({rental_id,user_id})
        return res.status(201).json(devolution)
    }
}
export {CreateDevolutionController}