import { ICar } from 'modules/car/Protocols/Car/CarProtocol';
import { ICarRepository } from 'modules/car/Protocols/Car/CarRepositoryProtocol';
import { IlistCarsUseCase } from '../../Protocols/Car/IlistCarsAvailables/IlistCarsAvailablesUseCase';

interface IRequest{
    category_id?:string,
    brand?:string,
    name?:string,
}

export class ListCarsAvailablesUseCase implements IlistCarsUseCase{
    constructor(private carRepository: ICarRepository){}
    async execute({category_id,brand,name}:IRequest): Promise<ICar[]> {
        const cars=await this.carRepository.findAvailable(category_id, brand, name)
        return cars
    }
    
}