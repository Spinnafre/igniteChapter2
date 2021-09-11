import { Car } from "../../infra/typeORM/entities/Car";
import { ICar } from "../../Protocols/Car/CarProtocol";
import { ICarRepository } from "../../Protocols/Car/CarRepositoryProtocol";

export class CarRepositoryinMemory implements ICarRepository {
    private cars: ICar[]=[]
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications,
    }: ICar): Promise<ICar> {
        const car=new Car()
         
        Object.assign(car,{
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,

        })
        this.cars.push(car);
        return car
    }
    async findByLicensePlate(license_plate:string):Promise<ICar>{
        const car=this.cars.find((c)=>c.license_plate==license_plate)
        return car
    }
    async findAvailable(category_id?:string,brand?:string,name?:string):Promise<ICar[]>{
        let carsAvailables=this.cars.filter(car=>car.available)

        if(!name && !brand && !category_id) return carsAvailables

        carsAvailables=carsAvailables.filter(car=>{
            if(car.brand === brand) return true
            if(car.name === name) return true
            if(car.category_id === category_id) return true
            return false
        })

        return carsAvailables

    }
    async findById(id:string):Promise<ICar>{
        return this.cars.find(c=>c.id===id)
    }
    async updateAvailable(id: string, available: boolean): Promise<void> {
        const car_id=this.cars.findIndex(c=>c.id === id)
        this.cars[car_id].available = available

    }
}
