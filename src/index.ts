import express from "express";
import multer from "multer";
import { categoriesRoutes } from "./routes/categoriesRoutes.routes";
import { importCategoriesRoutes } from "./routes/importCategoriesRoutes.routes";
import { specificationsRoutes } from "./routes/Specification.routes";
import swagger from 'swagger-ui-express'
import swaggerConfig from './swagger.json'

var upload = multer({ dest: './tmp' })

const app = express();

app.use('/api-docs',swagger.serve,swagger.setup(swaggerConfig))

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specification", specificationsRoutes);
app.use("/upload",upload.single('file'),importCategoriesRoutes);

app.listen(3333, () => {
  console.log(`Rodando em http://localhost:3333`);
});
