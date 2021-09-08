import { CreateDateColumn } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { ICarsImage } from '../../../Protocols/CarsImage/ICarsImage';
import { v4 as uuid4 } from "uuid";

@Entity('cars_image')
export class CarImage implements ICarsImage{
  @PrimaryColumn()
  id:string
  @Column()
  image_name:string
  @Column()
  car_id:string
  @CreateDateColumn()
  created_at:Date
  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
