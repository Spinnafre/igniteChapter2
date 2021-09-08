import { ICar } from "modules/car/Protocols/Car/CarProtocol"
import { ICarRepository } from "modules/car/Protocols/Car/CarRepositoryProtocol"
import { AppErrors } from "../../../../shared/errors/AppErrors"

export class CreateCarService{
    constructor(private carRepository:ICarRepository){}
    async execute(data:ICar):Promise<ICar>{
        if(await this.carRepository.findByLicensePlate(data.license_plate)){
            throw new AppErrors('Car already exists')
        }
        const car=await this.carRepository.create(data)
        return car
    }
}