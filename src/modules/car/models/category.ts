import { v4 as uuid4 } from "uuid";
import { CategoryProtocol} from "../Protocols/categoryProtocol";
export class Category implements CategoryProtocol{
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
