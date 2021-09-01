import { ISpecificationRepository } from '../../Protocols/Specifications/SpecificationRepositoryProtocol';
import { ISpecificationProtocol } from "../../Protocols/Specifications/SpecificationProtocols";

export class ShowSpecificationService{
    constructor(private SpecificationRepository:ISpecificationRepository) {}
    async execute():Promise<Array<ISpecificationProtocol>>{
        return await this.SpecificationRepository.show()
    }
}