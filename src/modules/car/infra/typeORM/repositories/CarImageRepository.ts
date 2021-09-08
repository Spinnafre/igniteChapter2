import { getRepository, Repository } from 'typeorm';
import { ICarsImage } from '../../../Protocols/CarsImage/ICarsImage';
import { CarImage } from '../entities/CarsImage';
import { ICarsImageRepository } from './../../../Protocols/CarsImage/ICarsImageRepository';


export class CarImageRepository implements ICarsImageRepository{
    private carRepository:Repository<CarImage>;
    constructor(){
        this.carRepository= getRepository(CarImage)
    }
    async create(data: ICarsImage): Promise<ICarsImage> {
        const carImage= this.carRepository.create(data)
        await this.carRepository.save(carImage)
        return carImage
    }
    
}