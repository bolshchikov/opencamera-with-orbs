const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { apiFactory } = require('./api');

const PORT = process.env.PORT || 5678;

const app = express();

app.set('views', './client');
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client'));
app.use('/api', apiFactory());

app.post('/check', async (req, res) => {
  res.render('check', {
    hash: '1234',
    timestamp: Date.now(),
  });
});

app.get('/ping', async (_, res) => res.send('pong'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
