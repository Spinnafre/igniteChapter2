import { v4 as uuid4 } from "uuid";
import { ISpecificationProtocol} from "../Protocols/Specifications/SpecificationProtocols";

export class Specification implements ISpecificationProtocol{
  id?:string
  name:string
  description:string
  created_at:Date
  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
