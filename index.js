const express = require('express');
const morgan = require('morgan');
const { createLogs } = require('./helpers/createLogs');

const app = express();

app.use(morgan('combined', {
  stream: {
    write: (message) => {
      createLogs(message, __dirname);
    }
  }
}));

app.get('/', (req, res) => {
  res.send('Hola, Mundo!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
