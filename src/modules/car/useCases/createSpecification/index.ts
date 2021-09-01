import { SpecificationRepository } from "../../repositories/SpecificationRepository"
import { CreateSpecificationController } from "./CreateSpecificationController"
import { CreateSpecificationService } from "./CreateSpecificationService"

export default ():CreateSpecificationController => {
    const specificationRepository = new SpecificationRepository()
    const specificationService = new CreateSpecificationService(specificationRepository)
    const specificationController = new CreateSpecificationController(specificationService)
    return specificationController
}

