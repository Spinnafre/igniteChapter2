import { ISpecificationProtocol } from "./SpecificationProtocols";

export interface ISpecificationRepository{
    create({name,description}:ISpecificationProtocol):void,
    findByName(name:string):boolean,
    show():Array<ISpecificationProtocol>
}