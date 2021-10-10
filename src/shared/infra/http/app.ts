import { AppErrors } from '../../errors/AppErrors';
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'

import multer from "multer";
import { categoriesRoutes } from "./routes/categoriesRoutes.routes";
import { importCategoriesRoutes } from "./routes/importCategoriesRoutes.routes";
import { specificationsRoutes } from "./routes/Specification.routes";
import {userRoutes } from "./routes/userRoutes.routes";
import swagger from 'swagger-ui-express'
import swaggerConfig from '../../../swagger.json'
import createConnection from '../typeORM'
import { authRouter } from './routes/authenticate.routes';
import { carRoutes } from './routes/CarRoutes.routes';
import { rentalRoutes } from './routes/rental.routes';
import { passwordForgotRouter } from './routes/password.routes';

import rateLimiter from './middlewares/rateLimiter'

import uploadConfig from '../../../config/upload'

createConnection().then(db=>console.log(`Conectado ao banco ${db.driver.database}`))

var upload = multer({ dest: './tmp' })

const app = express();

app.use(rateLimiter)

app.use('/api-docs',swagger.serve,swagger.setup(swaggerConfig))
app.use('/avatar',express.static(`${uploadConfig.tmpFolder}/avatar`))
app.use('/cars',express.static(`${uploadConfig.tmpFolder}/cars`))

app.use(express.json());


app.use("/user", userRoutes);
app.use(authRouter)
app.use(carRoutes)
app.use(rentalRoutes)
app.use(passwordForgotRouter)


app.use("/categories", categoriesRoutes);
app.use("/specification", specificationsRoutes);
app.use("/upload",upload.single('file'),importCategoriesRoutes);



app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
  if(error instanceof AppErrors){
    return res.status(error.statusCode).json({msg:error.errorMsg})
  }
  console.log(error)
  return res.status(500).json({msg:'Internal error'})
})

export {app}