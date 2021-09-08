import { CategoryProtocol } from '../../../Protocols/Category/categoryProtocol';
import { v4 as uuid4 } from "uuid";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Car } from './Car';
// import { CategoryProtocol} from "../Protocols/categoryProtocol";
@Entity('categories')
export class Category implements CategoryProtocol{
  @PrimaryColumn()
  id?:string
  @Column()
  name:string
  @Column()
  description:string
  @CreateDateColumn()
  created_at:Date
  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
