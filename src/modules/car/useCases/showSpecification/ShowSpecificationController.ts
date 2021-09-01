import { Response } from 'express';
import { Request } from 'express';
import { ISpecificationProtocol } from "../../Protocols/Specifications/SpecificationProtocols";

interface specificationService{
    execute():Promise<Array<ISpecificationProtocol>>
}

export class SpecificationController{
    constructor(private specificationService:specificationService) {}
    async handle(req:Request,res:Response):Promise<Response>{
        return res.status(200).json(await this.specificationService.execute())
    }
}