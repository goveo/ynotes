import express, { Application, Request, Response, NextFunction } from 'express';
import UserRouter from './routes/users';
import AuthRouter from './routes/auth';
import NotesRouter from './routes/notes';

import database from './database';

database.sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  }).catch((err) => {
    console.error('error : ', err);
  });

const app: Application = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello');
});

app.use('/api/users', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/notes', NotesRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
