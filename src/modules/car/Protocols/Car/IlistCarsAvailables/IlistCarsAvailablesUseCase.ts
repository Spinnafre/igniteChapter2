import { ICar } from "../CarProtocol";

interface IRequest{
    category_id:string,
    brand:string,
    name:string
}

export interface IlistCarsUseCase{
    execute({category_id,brand,name}:IRequest):Promise<ICar[]>
}