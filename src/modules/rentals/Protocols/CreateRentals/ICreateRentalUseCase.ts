import { IRental } from './../IRental';
import { Rental } from './../../infra/typeORM/entities/Rental';
export interface IRequestCreateRentalUseCase{
    car_id: string;
    user_id: string;
    expected_return_date:Date
}
export interface ICreateRentalUseCase{
    execute({car_id,user_id,expected_return_date}:IRequestCreateRentalUseCase):Promise<Rental>
}