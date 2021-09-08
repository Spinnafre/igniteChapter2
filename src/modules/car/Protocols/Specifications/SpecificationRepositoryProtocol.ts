import { Specification } from './../../infra/typeORM/entities/Specification';
import { ISpecificationProtocol } from "./SpecificationProtocols";

export interface ISpecificationRepository{
    create({name,description}:ISpecificationProtocol):Promise<Specification>,
    findByName(name:string):Promise<boolean>,
    show():Promise<Array<ISpecificationProtocol>>,
    findByIds(ids: string[]): Promise<Specification[]>
}