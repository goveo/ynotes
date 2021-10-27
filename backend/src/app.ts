import express, { Application } from 'express';
import cors from 'cors';
import UserRouter from './routes/users';
import AuthRouter from './routes/auth';
import NotesRouter from './routes/notes';

import database from './database';

database.sequelize.authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected!');
  }).catch((error) => {
    console.error('error: ', error);
  });

const app: Application = express();

app.use(express.json());
app.use(cors());

const PORT: number = Number(process.env.PORT) || 8000;

app.use('/api/users', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/notes', NotesRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${PORT}`);
});
