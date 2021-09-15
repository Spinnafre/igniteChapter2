import { IRental } from "../IRental";
export interface IRequestDevolutionUseCase{
    rental_id: string;
    user_id: string;
}
export interface IDevolutionUseCase{
    create({rental_id,user_id}:IRequestDevolutionUseCase):Promise<IRental>
}