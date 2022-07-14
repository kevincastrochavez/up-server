const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();
});

app.use('/', (req, res) => {
  res.send('Server is working');
});

try {
  app.listen(port);
  console.log(`Listening on port:${port}`);
} catch (err) {
  console.log(err);
}
