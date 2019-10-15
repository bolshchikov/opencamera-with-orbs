const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { calculateMediaHash } = require('./src/hash');
const { registerMedia, verifyMedia } = require('./src/contract');

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
  const id = calculateMediaHash(req.files.image.data);
  const {executionResult, data} = await verifyMedia(id);
  const isRegistered = executionResult === 'SUCCESS';
  console.log('Verification');
  console.log(id);
  console.log(executionResult);
  console.log(data);
  res.render('check', {
    isRegistered,
    fileName: req.files.image.name,
    hash: id,
    timestamp: isRegistered ? JSON.parse(data).timestamp : 'N/A',
    owner: isRegistered ? JSON.parse(data).owner : 'N/A'
  });
});

app.post('/api/register/:mediaId', async (req, res) => {
  const mediaId = req.params.mediaId;
  const metadata = JSON.stringify(req.body);
  console.log('Registration');
  console.log(mediaId);
  console.log(metadata);
  const result = await registerMedia(mediaId, metadata);
  res.send({ result });
});

app.get('/ping', async (_, res) => res.send('pong'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
