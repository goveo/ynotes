import express, { Application, Request, Response } from 'express';
import path from 'path';

const app: Application = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is started on port ${PORT}!`);
});
