import { ICar } from './../../../Protocols/Car/CarProtocol';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";
import { Category } from './category';
import { Specification } from './Specification';
@Entity('cars')
export class Car implements ICar{
    @PrimaryColumn()
    id?:string
    @Column()
    name:string
    @Column()
    daily_rate:number
    @Column()
    available:boolean=true
    @Column()
    fine_amount:number;
    @Column()
    brand:string
    @Column()
    category_id:string
    @Column()
    license_plate:string
    @Column()
    description:string
    @CreateDateColumn()
    created_at:Date
    //Relation
    @ManyToOne(type=>Category)
    @JoinColumn({name:"category_id"})
    category:Category

    @ManyToMany(type=>Specification)
    @JoinTable({
      name:'specifications_cars',
      joinColumns:[{name:'car_id'}],
      inverseJoinColumns:[{name:'specification_id'}]
    })
    specifications:Specification[]

    constructor() {
      if (!this.id) {
        this.id = uuid4();
      }
    }
  }
  