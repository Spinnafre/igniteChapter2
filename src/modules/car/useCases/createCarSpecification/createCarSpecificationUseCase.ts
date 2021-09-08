import { ICar } from './../../Protocols/Car/CarProtocol';
import { ISpecificationRepository } from './../../Protocols/Specifications/SpecificationRepositoryProtocol';
import { IRequestCreateCarSpecification } from './../../Protocols/Car/ICreateCarSpecification/ICreateCarSpecificationUseCase';
import { ICreateCarSpecificationUseCase } from '../../Protocols/Car/ICreateCarSpecification/ICreateCarSpecificationUseCase';
import {ICarRepository} from '../../Protocols/Car/CarRepositoryProtocol';
import { AppErrors } from '../../../../shared/errors/AppErrors';




export class CreateCarSpecificationUseCase implements ICreateCarSpecificationUseCase{
    constructor(private carRepository: ICarRepository,private specificationRepository:ISpecificationRepository){}
    async execute({car_id,specifications_id}:IRequestCreateCarSpecification):Promise<ICar>{
        const car=await this.carRepository.findById(car_id)
        if(!car){
            throw new AppErrors('Car not exists')
        }
        const specifications= await this.specificationRepository.findByIds(specifications_id)
        car.specifications=specifications

        await this.carRepository.create(car)
        return car
    }
}