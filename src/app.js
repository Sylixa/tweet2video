import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import apiRoutes from './api/index.js';
import NotFoundError from './utils/notFoundError.js';
import ExpressErrorHandler from './utils/ExpressErrHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('/', (_req, res) => {
    res.send(
        '<h1>Welcome to the Express API!</h1><p>Try navigating to <a href="/api">/api</a></p>'
    );
});

//! Not found page error
app.all(/.*/, NotFoundError);

// ! Error Handlers
app.use(ExpressErrorHandler);

export { app };
