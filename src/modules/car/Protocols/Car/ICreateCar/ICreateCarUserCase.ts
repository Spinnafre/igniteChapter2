import { ICar } from "../CarProtocol";

export interface ICreateCarUserCase {
    execute(
        { 
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        }: ICar): Promise<ICar>
}