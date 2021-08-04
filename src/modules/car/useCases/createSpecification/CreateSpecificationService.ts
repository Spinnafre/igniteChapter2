import { ISpecificationProtocol } from '../../Protocols/Specifications/SpecificationProtocols';
import { ISpecificationRepository } from '../../Protocols/Specifications/SpecificationRepositoryProtocol';
export class CreateSpecificationService{
    constructor(private specificationRepository:ISpecificationRepository){}
    execute({name,description}:ISpecificationProtocol){
        if(this.specificationRepository.findByName(name)){
            throw new Error('Specification already exists')
        }
        this.specificationRepository.create({name,description,created_at:new Date()})
    }
}