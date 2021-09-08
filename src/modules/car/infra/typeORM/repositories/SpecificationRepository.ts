import { Repository, getRepository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ISpecificationProtocol } from "../../../Protocols/Specifications/SpecificationProtocols";
import { ISpecificationRepository } from "../../../Protocols/Specifications/SpecificationRepositoryProtocol";

export class SpecificationRepository implements ISpecificationRepository {
  private specifications: Repository<Specification>;
  // private static INSTANCE:ISpecificationRepository|null=null
  constructor() {
    this.specifications = getRepository(Specification);
  }
  // static getInstance():ISpecificationRepository{
  //   if(SpecificationRepository.INSTANCE === null){
  //     SpecificationRepository.INSTANCE=new SpecificationRepository()
  //   }
  //   return SpecificationRepository.INSTANCE
  // }
  async create({ name, description }: ISpecificationProtocol): Promise<Specification> {
    const specification = this.specifications.create({
      name,
      description,
    });
    return await this.specifications.save(specification)
  }
  async findByName(name: string): Promise<boolean> {
    const specification = await this.specifications.findOne({name});
    return !!specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await this.specifications.findByIds(ids);
    return specification;
  }
  async show(): Promise<Array<ISpecificationProtocol>> {
    return await this.specifications.find()
  }
}
