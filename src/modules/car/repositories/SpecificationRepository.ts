import { Specification } from './../models/Specification';
import { ISpecificationProtocol } from "../Protocols/Specifications/SpecificationProtocols";
import { ISpecificationRepository } from "../Protocols/Specifications/SpecificationRepositoryProtocol";

export class SpecificationRepository  implements  ISpecificationRepository{
  private specifications:Array<ISpecificationProtocol>
  private static INSTANCE:ISpecificationRepository|null=null
  private constructor(){
    this.specifications=[]
  }
  static getInstance():ISpecificationRepository{
    if(SpecificationRepository.INSTANCE === null){
      SpecificationRepository.INSTANCE=new SpecificationRepository()
    }
    return SpecificationRepository.INSTANCE
  }
  create({name,description}:ISpecificationProtocol):void{
    const specification=new Specification()
    Object.assign(specification,{
      name,
      description,
      created_at:new Date()
    })
    this.specifications.push(specification)
  }
  findByName(name:string):boolean{
    const specification=this.specifications.some(s=>s.name===name)
    return specification
  }
  show():Array<ISpecificationProtocol>{
    return this.specifications
  }
}
