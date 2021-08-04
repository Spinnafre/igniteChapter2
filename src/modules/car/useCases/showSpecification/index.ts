import { SpecificationController } from './ShowSpecificationController';
import { SpecificationRepository } from './../../repositories/SpecificationRepository';
import { ShowSpecificationService } from './ShowSpecificationService';
const specificationRepository=SpecificationRepository.getInstance()
const specificationService=new ShowSpecificationService(specificationRepository)
const showSpecificationController=new SpecificationController(specificationService)

export {showSpecificationController}