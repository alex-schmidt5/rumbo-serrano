    import express from 'express';
    import cors from 'cors'; // <-- Agregar esta línea
    import { sequelize } from './models/index.js';
    import routes from './routes/index.js';

    const app = express();

    app.use(cors()); 
    app.use(express.json());

    sequelize.sync()
    .then(() => console.log('Base de datos y tablas sincronizadas.'))
    .catch((error) => console.error('Error al sincronizar:', error));

    app.use('/api', routes);

    export default app;