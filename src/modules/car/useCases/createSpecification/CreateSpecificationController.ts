import { Request, Response } from "express"
import { ISpecificationProtocol } from "../../Protocols/Specifications/SpecificationProtocols"

interface specificationService{
    execute({name,description}:ISpecificationProtocol):Promise<void>
}

export class CreateSpecificationController{
    constructor(private specificationService:specificationService) {}
    async handle(req:Request,res:Response):Promise<Response>{
        const {name,description}=req.body
        await this.specificationService.execute({name,description})
        return res.status(201).json({msg:'Specifications created with success'})
    }
}