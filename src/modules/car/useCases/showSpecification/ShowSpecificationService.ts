import { ISpecificationRepository } from './../../Protocols/Specifications/SpecificationRepositoryProtocol';
import { ISpecificationProtocol } from "../../Protocols/Specifications/SpecificationProtocols";

export class ShowSpecificationService{
    constructor(private SpecificationRepository:ISpecificationRepository) {}
    execute():Array<ISpecificationProtocol>{
        return this.SpecificationRepository.show()
    }
}