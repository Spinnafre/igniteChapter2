import { ICarRepository } from './../../../car/Protocols/Car/CarRepositoryProtocol';
import { IDateProvider } from './../../../../shared/container/providers/DateProvider/Protocols/IDateProvider';
import { DateProvider } from './../../../../shared/container/providers/DateProvider/DayjsProvider';
import { AppErrors } from './../../../../shared/errors/AppErrors';
import { IRentalRepository } from './../../Protocols/IRentalRepository';
import { Rental } from './../../infra/typeORM/entities/Rental';
import { IRental } from './../../Protocols/IRental';



import { ICreateRentalUseCase, IRequestCreateRentalUseCase } from './../../Protocols/CreateRentals/ICreateRentalUseCase';


export class CreateRentalUseCase implements ICreateRentalUseCase {
    constructor(
        private rentalRepository: IRentalRepository,
        private dateProvider: IDateProvider,
        private carRepository: ICarRepository
    ) { }
    async execute({ car_id, user_id, expected_return_date }: IRequestCreateRentalUseCase): Promise<Rental> {
        // Indicador de que só pode criar um novo aluguel com a data esperada superior 
        //a 24 hrs da data de início do aluguel
        const minHours = 24
        // Irá veficar se existe um aluguel com o carro e que não tenha sido entregue ainda o carro
        const rentalOpenByCar = await this.rentalRepository.findOpenRentalByCar(car_id)
        // Irá impedir que cadastre um novo aluguel sem antes ter que entregar o carro 
        // Pois o end_date tem que estar registrado com a data de entrega, caso seja nulo
        // É sinal de que ainda o carro ainda não foi entregue e não pode ser realizado o aluguel 
        if (rentalOpenByCar) {
            throw new AppErrors('Car unavailable');
        }

        //Irá buscar o usuário para saber se ele tem alguma veícula para entregar ou não
        const rentalOpenByUser = await this.rentalRepository.findOpenRentalByUser(user_id)
        // Caso o usuário não tenha entregado o veículo, então irá dar error
        if (rentalOpenByUser) {
            throw new AppErrors("There's  a rental in progress for user")
        }


        // Irá registrar o horário que iniciou o aluguel
        const dateNow = this.dateProvider.DateNow()

        const timeDiff = this.dateProvider.compareInHours(dateNow, expected_return_date)
        console.log('timeDiff ',timeDiff);
        //Intervalo de tempo menor do que 24hrs
        if (timeDiff < minHours) {
            throw new AppErrors('Invalid Date')
        }

        const rental = await this.rentalRepository.create(
            {
                car_id,
                user_id,
                expected_return_date
            }
        )

        //Irá atualizar o available do carro, tornando o indisponível para outros aluguéis
        await this.carRepository.updateAvailable(car_id,false)
        return rental
    }


}