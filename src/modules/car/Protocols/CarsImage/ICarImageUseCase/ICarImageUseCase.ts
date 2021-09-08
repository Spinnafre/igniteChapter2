import { ICarsImage } from '../../../Protocols/CarsImage/ICarsImage';
import { CarImage } from './../../../infra/typeORM/entities/CarsImage';

export interface IRequestCarImageUseCase{
    car_id: string
    images_names: string[]
}
export interface ICarImageUseCase{
    execute({car_id,images_names}:IRequestCarImageUseCase): Promise<void>;
}