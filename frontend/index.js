
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is started on port ${PORT}!`);
});
