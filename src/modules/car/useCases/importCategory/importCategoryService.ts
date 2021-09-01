import fs from "fs";
import csvParse from "csv-parse";
import { ICreateCategoryRepository } from "../../Protocols/Category/CategoryRespositoryProtocol";

interface Category {
  name: string;
  description: string;
}

export class ImportCategoryService {
  constructor(private importCategoryRepository:ICreateCategoryRepository) {}
  loadCategories(file: Express.Multer.File): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      const categories: Array<Category> = [];
      //read a range of bytes from the file instead of the entire file
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      //Pega o pedaço lido e passa para dentro do parseFile
      stream.pipe(parseFile);
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          // Remove o arquivo
          fs.promises.unlink(file.path)
            resolve(categories)
        })
        .on('error',(err)=>{
            reject(err)
        })
    });
  }
  async execute(file: Express.Multer.File): Promise<void>{
      const readFile=await this.loadCategories(file)
      readFile.forEach(async cat=>{
          const {name,description}=cat
          const alreadExists=await this.importCategoryRepository.findByCategory(name)
          if(!alreadExists){
              await this.importCategoryRepository.create({name,description})
          }
      })
    //   this.importCategoryRepository.create(readFile)
  }
}
