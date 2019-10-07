const axios = require('axios');
const { fork } = require('child_process');

const baseUrl = 'http://localhost:5678';

describe('API', () => {
  let serverProcess;
  beforeEach((done) => {
    serverProcess = fork('index.js');
    setTimeout(done, 250); // give little time for server to spin up;
  });

  afterEach(() => {
    serverProcess.kill();
  });

  it('register media item', async () => {
    const mediaId = '1234a';
    const { data } = await axios.post(`${baseUrl}/api/register/${mediaId}`);
    expect(data.result).toEqual('ok');
  });
});
