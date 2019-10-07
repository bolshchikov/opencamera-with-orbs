const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { sha256 } = require('js-sha256');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5678;

const app = express();

app.set('views', './client');
app.set('view engine', 'ejs');

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/check', async (req, res) => {
  res.render('check', {
    fileName: req.files.image.name,
    hash: sha256(req.files.image.data),
    timestamp: Date.now(),
  });
});

app.post('/api/register/:mediaId', async (req, res) => {
  console.log(req.params.mediaId);
  console.log(req.body);
  res.send({ result: 'ok' });
});

app.get('/ping', async (_, res) => res.send('pong'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
