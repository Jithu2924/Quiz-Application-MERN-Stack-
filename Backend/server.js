const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

require('./Db');

const router = require('./routes');
app.use(router);

app.listen(8000, () => {
  console.log('App connected @http://localhost:8000');
});
