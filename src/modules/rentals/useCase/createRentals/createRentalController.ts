import { ICreateRentalUseCase } from './../../Protocols/CreateRentals/ICreateRentalUseCase';
import { Request, Response} from 'express';


export class CreateRentalController {
    constructor(private rentalUseCase:ICreateRentalUseCase){}
    async handle(req: Request, res: Response):Promise<Response> {
        const {id:user_id}=req.user
        const {car_id,expected_return_date}=req.body
        console.log(car_id,' ',expected_return_date);

        const rental=await this.rentalUseCase.execute({car_id,user_id,expected_return_date})
        return res.status(201).json(rental)
    }
}
