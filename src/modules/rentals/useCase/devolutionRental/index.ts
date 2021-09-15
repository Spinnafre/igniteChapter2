import { DateProvider } from '../../../../shared/container/providers/DateProvider/DayjsProvider';
import { CarRepository } from '../../../car/infra/typeORM/repositories/CarRepository';
import { RentalRepository } from '../../infra/typeORM/repositories/RentalRepository';
import { CreateDevolutionController } from "./createDevolutionController"
import { CreateDevolutionUseCase } from "./createDevolutionUseCase"

export default ():CreateDevolutionController=>{
    const rentalRepository = new RentalRepository()
    const carRepository = new CarRepository()
    const dateProvider = new DateProvider()
    const createDevolutionUseCase=new CreateDevolutionUseCase(
        carRepository,
        rentalRepository,
        dateProvider
    )
    const createDevolutionUseController= new CreateDevolutionController(createDevolutionUseCase)
    return createDevolutionUseController
}