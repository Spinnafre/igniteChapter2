import { ICar } from './../CarProtocol';
export interface IRequestCreateCarSpecification{
    car_id: string;
    specifications_id:Array<string>
}
export interface ICreateCarSpecificationUseCase{
    execute({car_id,specifications_id}:IRequestCreateCarSpecification):Promise<ICar>
}