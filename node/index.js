const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5678;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/register/:mediaId', async (req, res) => {
    console.log(req.params.mediaId);
    console.log(req.body);
});

app.get('/ping', async (req, res) => {
    res.send('pong');
});

app.listen(PORT, () => console.log('Listening on ' + PORT));