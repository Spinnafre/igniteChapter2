import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';
import { SpecificationRepositoryInMemory } from './../../repositoriesMemory/in-memory/SpecificationRepositoryInMemory';
import { CarRepositoryinMemory } from './../../repositoriesMemory/in-memory/CarRepositoryInMemory';
import { AppErrors } from '../../../../shared/errors/AppErrors';

let carRepoInMemory: CarRepositoryinMemory
let specificationRepoInMemory: SpecificationRepositoryInMemory;
let carSpecificationUseCase: CreateCarSpecificationUseCase
describe('Specification Car', () => {
    beforeEach(() => {
        carRepoInMemory = new CarRepositoryinMemory();
        specificationRepoInMemory = new SpecificationRepositoryInMemory();
        carSpecificationUseCase = new CreateCarSpecificationUseCase(carRepoInMemory, specificationRepoInMemory);
    })
    it('should not be able to add a new specification to a non-existent car', async () => {
        const specification= await specificationRepoInMemory.create({
            name:"Specification test",
            description:"Description test"
        })
        await expect(carSpecificationUseCase.execute({car_id:'123',specifications_id:[specification.id]}))
        .rejects.toEqual(new AppErrors('Car not exists'))

    })
    it('should be able to add a new specification to the car', async () => {
        const car = await carRepoInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        })
        const specification= await specificationRepoInMemory.create({
            name:"Specification test",
            description:"Description test"
        })
        const specification2= await specificationRepoInMemory.create({
            name:"Specification test 2",
            description:"Description test 2"
        })

        const carWithSpecifications= await carSpecificationUseCase.execute({car_id:car.id,specifications_id:[specification.id,specification2.id]})
        expect(carWithSpecifications).toHaveProperty('specifications')
        expect(carWithSpecifications.specifications).toHaveLength(2)

    })

})