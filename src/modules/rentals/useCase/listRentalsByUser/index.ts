import { RentalRepository } from './../../infra/typeORM/repositories/RentalRepository';
import { ListRentalByUserController } from './listRentalsByUserController';
import { ListRentalByUserUseCase } from './listRentalsByUserUseCase';
export default ():ListRentalByUserController=>{
    const rentalRepository = new RentalRepository()
    const listRentalByUserUseCase=new ListRentalByUserUseCase(rentalRepository)
    const listRentalByUserController=new ListRentalByUserController(listRentalByUserUseCase)
    return listRentalByUserController
}