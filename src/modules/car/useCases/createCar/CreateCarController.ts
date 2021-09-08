import { Request, Response } from "express";
import { ICreateCarUserCase } from "modules/car/Protocols/Car/ICreateCar/ICreateCarUserCase";

class CreateCarController {
    constructor(private carUserCase: ICreateCarUserCase) { }
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        } = req.body

        const car=await this.carUserCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        return res.status(201).json(car)
    }
}

export {CreateCarController} 