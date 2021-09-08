
import { AppErrors } from "../../../../shared/errors/AppErrors"
import { CarRepositoryinMemory } from "../../repositoriesMemory/in-memory/CarRepositoryInMemory"
import { CreateCarService } from "./CreateCarUseCase"

let carRepositoryInMemory:CarRepositoryinMemory
let createCarUseCase:CreateCarService

describe('Create Car',()=>{
    beforeEach(() =>{
        carRepositoryInMemory=new CarRepositoryinMemory();
        createCarUseCase = new CreateCarService(carRepositoryInMemory)
    })
    it('should be able to create a new car',async()=>{
        const car={
            name:'BMW',
            description:'Description Car',
            daily_rate:100,
            license_plate:'ABC-12',
            fine_amount:40,
            brand:'Brand',
            category_id:'123456789',
        }
        const newCar = await createCarUseCase.execute(car)
        expect(newCar).toHaveProperty('id')
    })
    it('should not be able to create a car with exists license_plate',async()=>{
        const car={
            name:'BMW',
            description:'Description Car',
            daily_rate:100,
            license_plate:'ABC-12',
            fine_amount:40,
            brand:'Brand',
            category_id:'123456789',
        }

        
        await createCarUseCase.execute(car)

        await expect(createCarUseCase.execute(car)).rejects.toBeInstanceOf(AppErrors)
    })
    it('should not be able to create a car with available true by default',async()=>{
        const car={
            name:'BMW',
            description:'Description Car',
            daily_rate:100,
            license_plate:'ABC-12',
            fine_amount:40,
            brand:'Brand',
            category_id:'123456789',
        }

        
        const newCar=await createCarUseCase.execute(car)
        await expect(newCar.available).toBe(true)
    })
})