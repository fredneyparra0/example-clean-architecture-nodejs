import express from 'express';
import dotenv from 'dotenv';

import { router } from './routes';
import { connectDb } from '../dataAccess/mongoDb/connection';
 
dotenv.config();
const port = process.env.PORT || 3100;
const app = express();

//this function does not go here, more for example, it is here 
connectDb()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => console.log(`server run in http://localhost:${port}`));