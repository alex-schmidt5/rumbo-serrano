import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());           // Permite que React se conecte
app.use(morgan('dev'));    // Muestra: GET /products 200 en consola
app.use(express.json());   // Entiende los objetos JSON que enviamos

export default app;