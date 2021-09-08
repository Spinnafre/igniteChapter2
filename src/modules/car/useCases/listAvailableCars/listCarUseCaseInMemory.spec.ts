import { CarRepositoryinMemory } from '../../repositoriesMemory/in-memory/CarRepositoryInMemory';
import { ListCarsAvailablesUseCase } from './listAvailableCarsUseCase';

let listCarsAvailablesUseCase:ListCarsAvailablesUseCase
let carRepositoryInMemory:CarRepositoryinMemory

describe('List Cars',()=>{
    beforeEach(() =>{
        carRepositoryInMemory=new CarRepositoryinMemory()
        listCarsAvailablesUseCase=new ListCarsAvailablesUseCase(carRepositoryInMemory)
    })

    it('should be able to list all available cars',async ()=>{
        const car=await carRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        })

        const cars= await listCarsAvailablesUseCase.execute({})

        expect(cars).toEqual([car])

    })
    it('should be able to list all available by brand', async ()=>{
        const car=await carRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        })

        const cars= await listCarsAvailablesUseCase.execute({brand: "Car_brand"})
        expect(cars).toEqual([car])
    })
    it('should be able to list all available by name', async ()=>{
        const car=await carRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        })

        const cars= await listCarsAvailablesUseCase.execute({name: "Car1"})
        expect(cars).toEqual([car])
    })
    it('should be able to list all available by category', async ()=>{
        const car=await carRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        })

        const cars= await listCarsAvailablesUseCase.execute({category_id: "category_id"})
        expect(cars).toEqual([car])
    })
})