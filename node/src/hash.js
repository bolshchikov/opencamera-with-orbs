const { sha256 } = require('js-sha256');

const calculateMediaHash = mediaBytes => {
  return sha256(mediaBytes);
};

module.exports = {
  calculateMediaHash
};
