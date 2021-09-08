import { CarImage } from '../../infra/typeORM/entities/CarsImage';
import { ICarsImage } from '../../Protocols/CarsImage/ICarsImage';
import { ICarsImageRepository } from '../../Protocols/CarsImage/ICarsImageRepository';
import { ICarImageUseCase, IRequestCarImageUseCase } from '../../Protocols/CarsImage/ICarImageUseCase/ICarImageUseCase';

export class CarImagesUseCase implements ICarImageUseCase{
    constructor(private carImageRepository: ICarsImageRepository){}
    async execute({ car_id, images_names }: IRequestCarImageUseCase): Promise<void> {
        images_names.map(async(image)=>{
            await this.carImageRepository.create({car_id, image_name:image})
        })
        return
    }

}