import { IRentalRepository } from './../Protocols/IRentalRepository';
import { Rental } from './../infra/typeORM/entities/Rental';
import { IRental } from './../Protocols/IRental';
export class RentalRepositoryInMemory implements IRentalRepository{
    private repository:Rental[]=[]
    // Procurar Aluguel de usuário que ainda não foi fechado
    async findOpenRentalByUser(user_id:string): Promise<Rental> {
        const rentalUser=this.repository.find(r=>{
            if(r.user_id === user_id && !r.end_date){
                return true
            }
            return false
        })
        return rentalUser;
    }
    //Procurar Aluguel de carro que não foi fechado ainda
    async findOpenRentalByCar(car_id:string): Promise<Rental> {
        const rentalCar=this.repository.find(r=>{
            if(r.car_id === car_id && !r.end_date){
                return true
            }
            return false
        })
        return rentalCar;
    }
    async findById(id: string): Promise<Rental> {
        const rental=this.repository.find(r=>r.id === id);
        return rental
    }
    async findByUser(user_id: string): Promise<Rental> {
        const rentalByUser=this.repository.find(r=>r.user_id===user_id);
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
        const rental=new Rental()
        
        Object.assign(rental,{
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total,
            start_date:new Date()
        })

        this.repository.push(rental)

        return rental
    }

}