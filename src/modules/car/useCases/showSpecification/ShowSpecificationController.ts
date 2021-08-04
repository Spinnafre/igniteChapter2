import { Response } from 'express';
import { Request } from 'express';
import { ISpecificationProtocol } from "../../Protocols/Specifications/SpecificationProtocols";

interface specificationService{
    execute():Array<ISpecificationProtocol>
}

export class SpecificationController{
    constructor(private specificationService:specificationService) {}
    handle(req:Request,res:Response):Response{
        return res.status(200).json(this.specificationService.execute())
    }
}