import { ISpecificationProtocol } from './../../Protocols/Specifications/SpecificationProtocols';
import { Specification } from './../../infra/typeORM/entities/Specification';

import { ISpecificationRepository } from './../../Protocols/Specifications/SpecificationRepositoryProtocol';


export class SpecificationRepositoryInMemory implements ISpecificationRepository {
    private specifications:Array<Specification>=[]
    async create({ name, description }: ISpecificationProtocol): Promise<Specification> {
        const specification=new Specification()
        Object.assign(specification,{
            name, description
        })
        this.specifications.push(specification)
        return specification
    }
    async findByName(name: string): Promise<boolean> {
        const specification=this.specifications.find(s=>s.name === name)
        return !!specification
    }
    async show(): Promise<ISpecificationProtocol[]> {
        return this.specifications
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = ids.map(id=>{
            return this.specifications.find(sp=>sp.id===id)
        })
        return specifications;
      }

}