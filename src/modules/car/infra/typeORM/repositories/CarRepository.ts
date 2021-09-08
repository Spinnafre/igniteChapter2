import { ICar } from "modules/car/Protocols/Car/CarProtocol";
import { ICarRepository } from "modules/car/Protocols/Car/CarRepositoryProtocol";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

export class CarRepository implements ICarRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = getRepository(Car);
    }
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications,
        id
    }: ICar): Promise<ICar> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id
        });
        await this.repository.save(car);
        return car
    }
    async findByLicensePlate(license_plate: string): Promise<ICar> {
        const car = this.repository.findOne({ license_plate })
        return car
    }
    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<ICar[]> {
        const carsAvailables=await this.repository.createQueryBuilder('car')
        .where('car.available = :available',{available:true})
        
        if(category_id){
            carsAvailables.andWhere('car.category_id = :category_id',{category_id:category_id})
        }
        if(brand){
            carsAvailables.andWhere('car.brand = :brand',{brand:brand})
        }
        if(name){
            carsAvailables.andWhere('car.name = :name',{name:name})
        }
        
        return await carsAvailables.getMany()
    }
    async findById(id: string): Promise<ICar> {
        const car = this.repository.findOne(id)
        return car
    }
}
