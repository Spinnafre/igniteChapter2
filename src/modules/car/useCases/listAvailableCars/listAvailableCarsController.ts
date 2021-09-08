import { Request, Response } from "express";
import { IlistCarsUseCase } from "modules/car/Protocols/Car/IlistCarsAvailables/IlistCarsAvailablesUseCase";

export class ListCarsAvailableController {
    constructor(private listCarAvailableUseCase:IlistCarsUseCase){}
    async handle(req:Request, res:Response):Promise<Response>{
        const {category_id,brand,name}=req.query;

        const carsAvailables=await this.listCarAvailableUseCase.execute({
            category_id:category_id as string,
            brand:brand as string,
            name:name as string
        })
        return res.status(200).json(carsAvailables)
    }
}