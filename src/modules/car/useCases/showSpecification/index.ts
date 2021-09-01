import { SpecificationController } from "./ShowSpecificationController";
import { SpecificationRepository } from "../../repositories/SpecificationRepository";
import { ShowSpecificationService } from "./ShowSpecificationService";

export default ():SpecificationController => {
  const specificationRepository = new SpecificationRepository();
  const specificationService = new ShowSpecificationService(
    specificationRepository
  );
  const showSpecificationController = new SpecificationController(
    specificationService
  );

  return showSpecificationController;
};
