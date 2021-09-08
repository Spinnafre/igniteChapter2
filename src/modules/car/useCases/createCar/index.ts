import { CarRepository } from "../../infra/typeORM/repositories/CarRepository"
import { CreateCarController } from "./CreateCarController"
import { CreateCarService } from "./CreateCarUseCase"

export default ():CreateCarController=>{
    const carRepository = new CarRepository()
    const createCarUseCase=new CreateCarService(carRepository)
    const createCarController=new CreateCarController(createCarUseCase)
    return createCarController
}