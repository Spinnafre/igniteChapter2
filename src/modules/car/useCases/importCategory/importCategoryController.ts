import { Request, Response } from "express";
import multer from "multer";

interface importCategoryService{
    execute(file:any):void
}

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./tmp");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });
// var upload = multer({ storage: storage }).single("file");

export class importCategoryController {
  constructor(private importCategoryService:importCategoryService) {}
  handler(req: Request, res: Response): Response {
    const {file}=req
    this.importCategoryService.execute(file)
    return res.status(201).json({ msg: "Arquivo enviado com sucesso "});
  }
}
