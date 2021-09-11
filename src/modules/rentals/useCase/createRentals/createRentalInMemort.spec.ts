import { ICarRepository } from './../../../car/Protocols/Car/CarRepositoryProtocol';
import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { IDateProvider } from './../../../../shared/container/providers/DateProvider/Protocols/IDateProvider';
import dayjs from 'dayjs';
import { AppErrors } from './../../../../shared/errors/AppErrors';
import { CarRepositoryinMemory } from './../../../car/repositoriesMemory/in-memory/CarRepositoryInMemory';
import { CreateRentalUseCase } from './createRentalUseCase';
import { RentalRepositoryInMemory } from './../../repositoriesInMemory/RentalRepositoryInMemory';

let rentalRepositoryInMemory: RentalRepositoryInMemory
let carRepositoryInMemory: ICarRepository
let dateProvider:IDateProvider
let rentalUseCase: CreateRentalUseCase

describe('Create Rental', () => {
    // Irá gerar uma data do dia posterior ao dia atual
    const dayAdd24hrs=dayjs().add(1,'day').toDate()
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryinMemory()
        rentalRepositoryInMemory = new RentalRepositoryInMemory()
        dateProvider= new DateProvider()
        rentalUseCase = new CreateRentalUseCase(
            rentalRepositoryInMemory,
            dateProvider,
            carRepositoryInMemory
        )
    })

    it('should be able to create a new rental', async () => {
        const car = await carRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        })
        const rental = await rentalUseCase.execute({
            car_id: car.id,
            user_id: "12345",
            expected_return_date: dayAdd24hrs
        })

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })
    it('should be able to create a new rental if there is another open to the same car', async () => {
        const car = await carRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        })
        await rentalUseCase.execute({
            car_id: car.id,
            user_id: "12345",
            expected_return_date: dayAdd24hrs
        })

        await expect(rentalUseCase.execute({
            car_id: car.id,
            user_id: "12345",
            expected_return_date: dayAdd24hrs
        })).rejects.toEqual(new AppErrors('Car unavailable'))
    })
    it('should be able to create a new rental if there is another open to the same user', async () => {
        const car = await carRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        })
        await rentalUseCase.execute({
            car_id: car.id,
            user_id: "12345",
            expected_return_date: dayAdd24hrs
        })

        await expect(rentalUseCase.execute({
            car_id: "125",
            user_id: "12345",
            expected_return_date: dayAdd24hrs
        })).rejects.toEqual(new AppErrors("There's  a rental in progress for user"))
    })
})