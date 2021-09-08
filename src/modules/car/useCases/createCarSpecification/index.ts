import { CreateCarSpecificationController } from './createCarSpecificationController';
import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';
import { SpecificationRepository } from './../../infra/typeORM/repositories/SpecificationRepository';
import { CarRepository } from './../../infra/typeORM/repositories/CarRepository';
export default ():CreateCarSpecificationController=>{
    const carRepository = new CarRepository()
    const specificationRepository=new SpecificationRepository();
    const carSpecificationUseCase=new CreateCarSpecificationUseCase(carRepository, specificationRepository)
    const carSpecificationController=new CreateCarSpecificationController(carSpecificationUseCase)
    return carSpecificationController
}