import { CarImageRepository } from '../../infra/typeORM/repositories/CarImageRepository';
import { CreateCarImagesController } from './uploadCarImagesController';
import { CarImagesUseCase } from './uploadCarImagesUseCase';
export default ():CreateCarImagesController=>{
    const carImageRepository=new CarImageRepository()
    const carImageUseCase=new CarImagesUseCase(carImageRepository)
    const carImageController=new CreateCarImagesController(carImageUseCase)
    return carImageController
}