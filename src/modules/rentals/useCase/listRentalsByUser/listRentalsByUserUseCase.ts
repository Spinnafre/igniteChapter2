import { IRental } from "modules/rentals/Protocols/IRental";
import { IRentalRepository } from "../../Protocols/IRentalRepository";
import { IListRentalByUserUseCase } from "../../Protocols/ListRentalByUseCase/IlistRentalByUseCase";

export class ListRentalByUserUseCase implements IListRentalByUserUseCase{
    constructor(private rentalRepository:IRentalRepository){}
    async execute(user_id: string): Promise<IRental[]> {
        const rentals=await this.rentalRepository.findByUser(user_id)
        return rentals
    }

}