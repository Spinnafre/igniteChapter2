import { Request, Response } from "express";
import { ICreateCarSpecificationUseCase } from "modules/car/Protocols/Car/ICreateCarSpecification/ICreateCarSpecificationUseCase";

export class CreateCarSpecificationController{
    constructor(private createCarSpecificationUseCase:ICreateCarSpecificationUseCase){}
    async handle(req: Request, res: Response):Promise<Response>{
        const {id:car_id }=req.params
        const {specifications_id}=req.body
        const car=await this.createCarSpecificationUseCase.execute({car_id,specifications_id});
        return res.status(201).json(car)
    }
}