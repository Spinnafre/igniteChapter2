import { Car } from './../../../../car/infra/typeORM/entities/Car';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid4 } from "uuid";
import { IRental } from './../../../Protocols/IRental';

@Entity('rentals') 
export class Rental implements IRental {
    @PrimaryColumn()
    id: string;
    
    @Column()
    car_id: string;

    //Irá juntar a tablea carros
    // através do car_id passado
    @ManyToOne(type=>Car)
    @JoinColumn({name:"car_id"})
    car:Car

    @Column()
    user_id: string;
    // Data de início do aluguel
    @Column()
    start_date: Date;
    // Data da devolução 
    @Column()
    end_date: Date;
    // Data esperada da devolução
    @Column()
    expected_return_date: Date;
    
    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuid4();
        }
    }

}