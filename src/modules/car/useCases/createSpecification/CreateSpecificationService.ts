import { AppErrors } from '../../../../shared/errors/AppErrors';
import { ISpecificationProtocol } from '../../Protocols/Specifications/SpecificationProtocols';
import { ISpecificationRepository } from '../../Protocols/Specifications/SpecificationRepositoryProtocol';
export class CreateSpecificationService{
    constructor(private specificationRepository:ISpecificationRepository){}
    async execute({name,description}:ISpecificationProtocol):Promise<void>{
        if(await this.specificationRepository.findByName(name)){
            throw new AppErrors('Specification already exists')
        }
        await this.specificationRepository.create({name,description})
    }
}