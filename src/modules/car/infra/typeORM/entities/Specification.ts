import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";
import { ISpecificationProtocol} from "../../../Protocols/Specifications/SpecificationProtocols";

@Entity('specifications')
export class Specification implements ISpecificationProtocol{
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
