import { CreateRentalController } from './createRentalController';
import { CreateRentalUseCase } from './createRentalUseCase';
import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { CarRepository } from './../../../car/infra/typeORM/repositories/CarRepository';
import { RentalRepository } from './../../infra/typeORM/repositories/RentalRepository';
export default ():CreateRentalController=>{
    const rentalRepository= new RentalRepository()
    const carRepository=new CarRepository()
    const dateProvider= new DateProvider()
    const createRentalUseCase= new CreateRentalUseCase(
        rentalRepository,
        dateProvider,
        carRepository
    )
    const createRentalController=new CreateRentalController(createRentalUseCase)
    return createRentalController
}