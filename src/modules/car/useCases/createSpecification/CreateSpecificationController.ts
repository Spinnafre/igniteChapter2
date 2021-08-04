import { Request, Response } from "express"
import { ISpecificationProtocol } from "../../Protocols/Specifications/SpecificationProtocols"

interface specificationService{
    execute({name,description}:ISpecificationProtocol):void
}

export class CreateSpecificationController{
    constructor(private specificationService:specificationService) {}
    handle(req:Request,res:Response):Response{
        const {name,description}=req.body
        this.specificationService.execute({name,description,created_at:new Date()})
        return res.status(201).json({msg:'Specifications created with success'})
    }
}