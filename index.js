const express = require('express');
const morgan = require('morgan');
const { createLogs } = require('./helpers/createLogs');
const { handleErrors } = require('./middleware/handleError');

const app = express();

app.use(
  morgan('combined', {
    stream: {
      write: (message) => {
        createLogs(message, __dirname, 'logs');
      },
    },
  })
);

app.get('/', (req, res, next) => {
  try {
    // Código que puede generar un error
    // throw new Error(JSON.stringify({ Error: 'Error de prueba', status: 500 }));

    return res.send('Hola mundo');
  } catch (err) {
    next(err);
  }
});

app.use(handleErrors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
