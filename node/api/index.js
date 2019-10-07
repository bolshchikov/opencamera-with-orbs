const { Router } = require('express');

const apiFactory = () => {
  const router = new Router();

  router.post('/register/:mediaId', async (req, res) => {
    console.log(req.params.mediaId);
    console.log(req.body);
    res.send({ result: 'ok' });
  });

  return router;
};

module.exports = {
  apiFactory,
};
