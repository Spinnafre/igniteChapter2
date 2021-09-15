import { IRentalRepository } from '../../Protocols/IRentalRepository'
import { ICarRepository } from '../../../car/Protocols/Car/CarRepositoryProtocol';
import { IRental } from '../../Protocols/IRental';


import { IDevolutionUseCase, IRequestDevolutionUseCase } from './../../Protocols/Devolution/IDevolutionUseCase';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/Protocols/IDateProvider';
import { AppErrors } from '../../../../shared/errors/AppErrors';
/*
    Taxas:
    1 - Taxa de atraso
    2- Taxa diária 
*/
class CreateDevolutionUseCase implements IDevolutionUseCase{
    constructor(
        private carRepository: ICarRepository,
        private rentalRepository: IRentalRepository,
        private dateProvider: IDateProvider
    ){}
    async create({ rental_id,user_id}: IRequestDevolutionUseCase): Promise<IRental> {
        const rental=await this.rentalRepository.findById(rental_id)
        if(!rental){
            throw new AppErrors('Rental does not exists')
        }

        const car=await this.carRepository.findById(rental.car_id);


        const minimumDaily=1
        const dateNow=this.dateProvider.DateNow()
        //Calcular a diária
        //Data inicial do aluguel - data atual da solicitação da devolução
        let daily= this.dateProvider.compareInDays(rental.start_date,dateNow)
        let total=0
        //Diária não pode ser 0
        if(daily<=0){
            daily=minimumDaily
        }
        total=(daily * car.daily_rate) + car.fine_amount
        //atraso
        const delay=this.dateProvider.compareInDays(dateNow,rental.expected_return_date)
        if(delay > 0){
            total+= delay * car.fine_amount
        }
        
        rental.total=total
        rental.end_date=this.dateProvider.DateNow()
        
        await this.carRepository.updateAvailable(rental.car_id,true)
        await this.rentalRepository.create(rental)

        return rental
    }

}
export {CreateDevolutionUseCase}