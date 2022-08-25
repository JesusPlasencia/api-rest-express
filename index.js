const express = require('express');
const routerAPI = require('./routes/index');
const cors = require('cors');
const {
  loggingErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const PORT = 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'http://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Access Denied'), false);
    }
  },
};

app.use(cors(options));
app.get('/', (req, res) => {
  res.send('Hi, this is my server in Express');
});

app.get('/home', (req, res) => {
  res.send('<h1>Hello, World</h1>');
});

app.get('/new-route', (req, res) => {
  res.send('Hi, this is a new endpoint.');
});

routerAPI(app);

app.use(loggingErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Listening on Port: ' + PORT);
});
