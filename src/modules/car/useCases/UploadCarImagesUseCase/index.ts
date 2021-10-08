import { S3StorageProvider } from './../../../../shared/container/providers/StorageProvider/S3StorageProvider';
import { localStorageProvider } from './../../../../shared/container/providers/StorageProvider/LocalStorageProvider';
import { CarImageRepository } from '../../infra/typeORM/repositories/CarImageRepository';
import { CreateCarImagesController } from './uploadCarImagesController';
import { CarImagesUseCase } from './uploadCarImagesUseCase';

const provider={
    local:localStorageProvider.getInstance(),
    s3:S3StorageProvider.getInstance()
}
export default ():CreateCarImagesController=>{
    const storage= provider[process.env.disk]
    const carImageRepository=new CarImageRepository()
    const carImageUseCase=new CarImagesUseCase(carImageRepository,storage)
    const carImageController=new CreateCarImagesController(carImageUseCase)
    return carImageController
}