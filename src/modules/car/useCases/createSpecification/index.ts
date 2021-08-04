import { SpecificationRepository } from "../../repositories/SpecificationRepository"
import { CreateSpecificationController } from "./CreateSpecificationController"
import { CreateSpecificationService } from "./CreateSpecificationService"

const specificationRepository=SpecificationRepository.getInstance()
const specificationService=new CreateSpecificationService(specificationRepository)
const specificationController= new CreateSpecificationController(specificationService)

export {specificationController}