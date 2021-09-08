import { CarRepository } from "../../infra/typeORM/repositories/CarRepository";
import { ListCarsAvailableController } from "./listAvailableCarsController";
import { ListCarsAvailablesUseCase } from "./listAvailableCarsUseCase"

export default ():ListCarsAvailableController=>{
    const carRepository = new CarRepository();
    const listCarsAvailablesUseCase=new ListCarsAvailablesUseCase(carRepository)
    const listCarsAvailablesController=new ListCarsAvailableController(listCarsAvailablesUseCase)
    return listCarsAvailablesController
}