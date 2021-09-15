import { getRepository, Repository } from 'typeorm';
import { IRental } from 'modules/rentals/Protocols/IRental';
import { Rental } from '../entities/Rental';
import { IRentalRepository } from './../../../Protocols/IRentalRepository';
export class RentalRepository implements IRentalRepository{
    private repository:Repository<Rental>
    constructor(){
        this.repository=getRepository(Rental)
    }
    // Procurar Aluguel de usuário que ainda não foi fechado
    async findOpenRentalByUser(user_id:string): Promise<Rental> {
        const rentalUser=await this.repository.findOne({
            where:[{user_id:user_id},{end_date:null}],
            
        })
        return rentalUser;
    }
    //Procurar Aluguel de carro que não foi fechado ainda
    async findOpenRentalByCar(car_id:string): Promise<Rental> {
        const rentalCar=await this.repository.findOne({
            where:[{car_id:car_id},{end_date:null}],
            
        })
        return rentalCar;
    }
    async findById(id: string): Promise<Rental> {
        const rental=await this.repository.findOne(id)
        return rental
    }
    async findByUser(user_id: string): Promise<Rental[]> {
        console.log(user_id)
        const rentalByUser=await this.repository.find({
            where:{user_id},
            relations:["car"]
        })
        return rentalByUser
    }
    async create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: IRental): Promise<Rental> {
        const rental=this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total,
        })
        console.log(rental)
        await this.repository.save(rental)
        return rental
    }

}