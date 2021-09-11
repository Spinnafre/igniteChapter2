import { IRental } from "./IRental";
import { Rental } from "./../infra/typeORM/entities/Rental";
export interface IRentalRepository {
    create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: IRental): Promise<Rental>;

    findOpenRentalByUser(user_id:string):Promise<Rental>;

    findOpenRentalByCar(car_id:string):Promise<Rental>;

    findById(id:string):Promise<Rental>;

    findByUser(user_id:string):Promise<Rental>;
}
