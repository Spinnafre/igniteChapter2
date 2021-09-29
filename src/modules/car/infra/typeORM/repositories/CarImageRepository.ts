import { getRepository, Repository } from 'typeorm';
import { ICarsImage } from '../../../Protocols/CarsImage/ICarsImage';
import { CarImage } from '../entities/CarsImage';
import { ICarsImageRepository } from './../../../Protocols/CarsImage/ICarsImageRepository';


export class CarImageRepository implements ICarsImageRepository{
    private carRepository:Repository<CarImage>;
    constructor(){
        this.carRepository= getRepository(CarImage)
    }
    async create(car_id:string,image_name:string): Promise<ICarsImage> {
        const carImage= this.carRepository.create({
            car_id,
            image_name
        })
        await this.carRepository.save(carImage)
        return carImage
    }
    
}