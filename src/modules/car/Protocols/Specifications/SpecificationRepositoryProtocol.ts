import { ISpecificationProtocol } from "./SpecificationProtocols";

export interface ISpecificationRepository{
    create({name,description}:ISpecificationProtocol):Promise<void>,
    findByName(name:string):Promise<boolean>,
    show():Promise<Array<ISpecificationProtocol>>
}