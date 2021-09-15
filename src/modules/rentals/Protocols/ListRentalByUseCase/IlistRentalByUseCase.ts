import { IRental } from "../IRental";

export interface IListRentalByUserUseCase{
    execute(user_id: string):Promise<IRental[]>
}